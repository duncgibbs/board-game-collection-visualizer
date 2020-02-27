import React, { useState, useEffect } from 'react';

import SortSelect from './searchbar/SortSelect';
import SearchField from './searchbar/SearchField';

import BoardGameGeekAPI from '../BoardGameGeekAPI';

import './SearchBar.css';

type SearchBarProps = {
    collection: Array<Record<string, any>>;
	setCollection: (collection: Array<Record<string, any>>) => void;
	collectionSort: string;
	setCollectionSort: (collectionSort: string) => void;
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
        <div className="search-bar">
            <SearchField setUsername={setUsername} />
            <SortSelect currentSort={props.collectionSort} selectSort={props.setCollectionSort} />
		</div>
	);
}
