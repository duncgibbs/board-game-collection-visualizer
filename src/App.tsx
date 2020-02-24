import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import BoardGameGeekAPI from './BoardGameGeekAPI';
import './App.css';

function App() {
    let [collection, setCollection] = useState(Array<Element>());
    const [username, setUsername] = useState('');

    const getBGGCollection = () => {
		BoardGameGeekAPI.getCollectionForUser(username)
			.then((userCollection: any[]) => {
				setCollection(userCollection);
			});
	}

	const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.charCode === 13 || e.key === 'Enter') {
			getBGGCollection();
		}
	};

	const renderBoardGame = (game: Record<string, any>) => {
		return (
			<GridListTile key={game.id}>
				<img src={game.image} alt={game.name} />
				<GridListTileBar title={game.name} />
			</GridListTile>
		);
	};

	return (
		<div className="App">
			<div className="user-search">
          		<TextField
          			id="collection-username"
          			label="Username"
          			variant="outlined"
          			onKeyUp={handleKeyUp}
          			onChange={e => setUsername(e.target.value)}
          		/>
          	</div>
          	<div className="board-game-gallery">
          		<GridList cols={4}>
					{collection.map(renderBoardGame)}
          		</GridList>
          	</div>
    	</div>
  	);
}

export default App;
