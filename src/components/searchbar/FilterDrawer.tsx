import React, { useState, useEffect } from 'react';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import RangeSliderFilter from './filters/RangeSliderFilter';
import YearPublishedFilter from './filters/YearPublishedFilter';

type FilterDrawerProps = {
    collection: Array<Record<string, any>>;
	setCollectionFilter: (test: Record<string, any>) => void;
};

export default function FilterDrawer(props: FilterDrawerProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filterNumber, setFilterNumber] = useState(0);
    const [filters, setFilters] = useState({} as Record<string, any>);

    const minPlayerCount = Math.min(...props.collection.map(game => game.minplayers));
    const maxPlayerCount = Math.max(...props.collection.map(game => game.maxplayers));
    const minPlayTime = Math.min(...props.collection.map(game => game.minplaytime));
    const maxPlayTime = Math.max(...props.collection.map(game => game.maxplaytime));
    const years = [...new Set(props.collection.map(game => game.yearpublished))].sort();

    const updateCollectionFilters = props.setCollectionFilter;

    useEffect(() => {
        setFilterNumber(Object.keys(filters).length);
		updateCollectionFilters(filters);
    }, [filters, updateCollectionFilters]);

	const renderFilterDrawer = () => {
		return (
			<List>
				<ListSubheader>Filters</ListSubheader>
				<ListItem>
					<RangeSliderFilter
						title={'Player Count'}
						classes='player-count-slider'
						track={'normal'}
						range={{min: minPlayerCount, max: maxPlayerCount}}
						currentFilter={filters['playercount'] ?
							[filters['playercount'].min.value, filters['playercount'].max.value] :
    						undefined
    					}
						setFilter={(counts) => {
    						const playerCountFilter = {'playercount': {
        						min: {property: 'minplayers', value: counts[0]},
        						max: {property: 'maxplayers', value: counts[1]}
    						}};
    						setFilters({...filters, ...playerCountFilter});
    					}}
					/>
				</ListItem>
                <ListItem>
					<RangeSliderFilter
						title={'Play Time'}
						step={5}
						classes='play-time-slider'
						track={'inverted'}
						range={{min: minPlayTime, max: maxPlayTime}}
						currentFilter={filters['playtime'] ?
							[filters['playtime'].min.value, filters['playtime'].max.value] :
    						undefined
    					}
                        setFilter={(times) => {
    						const playTimeFilter = {'playtime': {
        						min: {property: 'minplaytime', value: times[0]},
        						max: {property: 'maxplaytime', value: times[1]}
    						}};
    						setFilters({...filters, ...playTimeFilter});
    					}}
					/>
				</ListItem>
                <ListItem>
					<YearPublishedFilter
						years={years}
						currentFilter={filters['yearpublished'] ?
							[filters['yearpublished'].min.value, filters['yearpublished'].max.value] :
    						undefined
    					}
                        setFilter={(years) => {
    						const yearPublishedFilter = {'yearpublished': {
        						min: {property: 'yearpublished', value: years[0]},
        						max: {property: 'yearpublished', value: years[1]}
    						}};
    						setFilters({...filters, ...yearPublishedFilter});
    					}}
					/>
				</ListItem>
			</List>
		);
	};
    
	return (
		<div className='filter-drawer-wrapper'>
        	<Button onClick={() => setDrawerOpen(true)} className='search-bar-input' variant='outlined'>
        		Filters
        		<Chip variant='outlined' size='small' label={filterNumber} />
        	</Button>
        	<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} anchor='bottom'>
    			{renderFilterDrawer()}
        	</Drawer>
    	</div>
	);
};
