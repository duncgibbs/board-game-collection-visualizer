import React, { useState } from 'react';
import BoardGameGallery from './components/BoardGameGallery';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
    let [collection, setCollection] = useState(Array<Record<string, any>>());
    let [collectionSort, setCollectionSort] = useState('name');

	return (
		<div className="App">
			<SearchBar
				collection={collection}
				setCollection={setCollection}
				collectionSort={collectionSort}
				setCollectionSort={setCollectionSort}
			/>
          	<BoardGameGallery games={collection} sort={collectionSort} />
    	</div>
  	);
}

export default App;
