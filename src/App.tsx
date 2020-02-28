import React, { useState } from 'react';
import BoardGameGallery from './components/BoardGameGallery';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
    const [collection, setCollection] = useState(Array<Record<string, any>>());
    const [collectionSort, setCollectionSort] = useState('name');
    const [collectionFilters, setCollectionFilters] = useState({});

	let gallery;

    if (collection.length && collection[0].hasOwnProperty('error')) {
        gallery = (
			<div className='bgg-error'>
				<div>
        			Sorry, something has gone wrong.<br/>
    				Try again in a few minutes.
    			</div>
			</div>
        );
    } else {
		gallery = (
			<BoardGameGallery
				games={collection}
				sort={collectionSort}
				filters={collectionFilters}
			/>
		);
    }

	return (
		<div className="App">
			<SearchBar
				collection={collection}
				setCollection={setCollection}
				collectionSort={collectionSort}
				setCollectionSort={setCollectionSort}
				setCollectionFilters={setCollectionFilters}
			/>
          	{gallery}
    	</div>
  	);
}

export default App;
