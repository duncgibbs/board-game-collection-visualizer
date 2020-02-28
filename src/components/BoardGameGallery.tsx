import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

import './BoardGameGallery.css';

type BoardGameGalleryProps = {
	games: Array<Record<string, any>>;
	sort: string;
	filters: Record<string, any>;
};

export default function BoardGameGallery(props: BoardGameGalleryProps) {
    const sortGames = (games: Array<Record<string, any>>) => {
		const ascendingSorts = ['maxplayers'];
        games.sort((gameOne, gameTwo) => {
            if (ascendingSorts.includes(props.sort)) {
                return gameTwo[props.sort] - gameOne[props.sort];
            } else if (props.sort === 'name') {
				return gameOne[props.sort].localeCompare(gameTwo[props.sort]);
            } else {
            	return gameOne[props.sort] - gameTwo[props.sort];
            }
    	});

    	return games;
    };

    const filterGames = (games: Array<Record<string, any>>) => {
        let filteredGames = games;
		if (props.filters['playercount']) {
    		const minPlayers = props.filters['playercount'][0];
    		const maxPlayers = props.filters['playercount'][1];
			filteredGames = filteredGames.filter(game => {
				return (game.minplayers >= minPlayers && game.maxplayers <= maxPlayers);
			});
		}

		return filteredGames;
    };
    
    const renderBoardGame = (game: Record<string, any>) => {
        const title = (
			<div className="game-info-bar">
				<div className="title">{game.name}</div>
				<div className="players">
					<FontAwesomeIcon icon={faUser} />
					{(game.minplayers === game.maxplayers) ? (
    					`${game.minplayers}`
    				) : (
    					`${game.minplayers}-${game.maxplayers}`
    				)}
    			</div>
    			<div className="time">
					<FontAwesomeIcon icon={faClock} />
					{(game.minplaytime === game.maxplaytime) ? (
    					`${game.minplaytime}`
    				) : (
    					`${game.minplaytime}-${game.maxplaytime}`
    				)}
    			</div>
			</div>
        );
		return (
    			<GridListTile key={game.id}>
    				{/*<img src={game.image} alt={game.name} />*/}
    				<GridListTileBar title={title} />
    			</GridListTile>
		);
	};

	return (
        <div className="board-game-gallery">
            <GridList cols={4} cellHeight={250}>
        		{sortGames(filterGames(props.games)).map(renderBoardGame)}
      		</GridList>
      	</div>
	);
}

