import React, { useState, useEffect } from 'react';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import FilterList from './filters/FilterList';

type FilterDrawerProps = {
    collection: Array<Record<string, any>>;
	setCollectionFilter: (test: Record<string, any>) => void;
};

export default function FilterDrawer(props: FilterDrawerProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filterNumber, setFilterNumber] = useState(0);
    const [filters, setFilters] = useState({} as Record<string, any>);

    const updateCollectionFilters = props.setCollectionFilter;

    useEffect(() => {
        setFilterNumber(Object.keys(filters).length);
		updateCollectionFilters(filters);
    }, [filters, updateCollectionFilters]);

	return (
		<div className='filter-drawer-wrapper'>
        	<Button onClick={() => setDrawerOpen(true)} className='search-bar-input' variant='outlined'>
        		Filters
        		<Chip variant='outlined' size='small' label={filterNumber} />
        	</Button>
        	<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} anchor='bottom'>
    			<FilterList collection={props.collection} filters={filters} setFilters={setFilters} />
        	</Drawer>
    	</div>
	);
};
