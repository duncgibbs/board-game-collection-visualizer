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
	const rangeFilters = ['playercount', 'playtime', 'yearpublished'];
    
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

        Object.keys(props.filters).forEach(filterKey => {
			if (rangeFilters.includes(filterKey)) {
    			const filter = props.filters[filterKey] as Record<string, any>;
				filteredGames = filteredGames.filter(game => {
					return (
						game[filter.min.property] >= filter.min.value &&
						game[filter.max.property] <= filter.max.value
					);
				});
			}
        });

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

