import React, { useState, useEffect } from 'react';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import PlayerCountFilter from './filters/PlayerCountFilter';

type FilterDrawerProps = {
    collection: Array<Record<string, any>>;
	setCollectionFilter: (test: Record<string, any>) => void;
};

export default function FilterDrawer(props: FilterDrawerProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filterNumber, setFilterNumber] = useState(0);
    const [filters, setFilters] = useState({} as Record<string, any>);

    const minPlayerCount = Math.min(...props.collection.map(game => {
		return game.minplayers;
    }));

    const maxPlayerCount = Math.max(...props.collection.map(game => {
		return game.maxplayers;
    }));

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
					<PlayerCountFilter
						playerCounts={{min: minPlayerCount, max: maxPlayerCount}}
						currentFilter={filters['playercount']}
						setPlayerCountFilter={(count) => {
    						const playerCountFilter = {'playercount': count};
    						setFilters({...filters, ...playerCountFilter});
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
