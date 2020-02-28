import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import SortSelect from './searchbar/SortSelect';
import SearchField from './searchbar/SearchField';
import FilterDrawer from './searchbar/FilterDrawer';

import BoardGameGeekAPI from '../BoardGameGeekAPI';

import './SearchBar.css';

type SearchBarProps = {
    collection: Array<Record<string, any>>;
	setCollection: (collection: Array<Record<string, any>>) => void;
	collectionSort: string;
	setCollectionSort: (collectionSort: string) => void;
	setCollectionFilters: (collectionFilters: Record<string, any>) => void;
};

export default function SearchBar(props: SearchBarProps) {
    let [username, setUsername] = useState('');

    const updateCollection = props.setCollection;

    useEffect(() => {
        if (username !== '') {
    		BoardGameGeekAPI.getCollectionForUser(username)
    			.then((userCollection: any[]) => {
    				updateCollection(userCollection);
    			});
        }
	}, [username, updateCollection]);

	return (
		<AppBar>
			<Toolbar className="search-bar">
                <SearchField setUsername={setUsername} />
                <SortSelect currentSort={props.collectionSort} selectSort={props.setCollectionSort} />
                <FilterDrawer
					collection={props.collection}
                	setCollectionFilter={props.setCollectionFilters}
                />
			</Toolbar>
		</AppBar>
	);
}
