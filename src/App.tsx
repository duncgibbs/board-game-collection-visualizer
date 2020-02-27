import React, { useState } from 'react';
import BoardGameGallery from './components/BoardGameGallery';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
    let [collection, setCollection] = useState(Array<Record<string, any>>());
    let [collectionSort, setCollectionSort] = useState('name');

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
		gallery = (<BoardGameGallery games={collection} sort={collectionSort} />);
    }

	return (
		<div className="App">
			<SearchBar
				collection={collection}
				setCollection={setCollection}
				collectionSort={collectionSort}
				setCollectionSort={setCollectionSort}
			/>
          	{gallery}
    	</div>
  	);
}

export default App;
