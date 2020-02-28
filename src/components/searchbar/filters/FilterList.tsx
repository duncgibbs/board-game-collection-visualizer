import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import RangeSliderFilter from './RangeSliderFilter';
import YearPublishedFilter from './YearPublishedFilter';

type FilterListProps = {
	collection: Array<Record<string, any>>;
	filters: Record<string, any>;
	setFilters: (filters: Record<string, any>) => void;
};

export default function FilterList(props: FilterListProps) {
	const collection = props.collection;
	const filters = props.filters;
	const setFilters = props.setFilters;
    
    const minPlayerCount = Math.min(...collection.map(game => game.minplayers));
    const maxPlayerCount = Math.max(...collection.map(game => game.maxplayers));
    const minPlayTime = Math.min(...collection.map(game => game.minplaytime));
    const maxPlayTime = Math.max(...collection.map(game => game.maxplaytime));
    const years = [...new Set(collection.map(game => game.yearpublished))].sort();

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
