import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

import BoardGameActions from '../BoardGameActions';

import './BoardGameGallery.css';

type BoardGameGalleryProps = {
	games: Array<Record<string, any>>;
	sort: string;
	filters: Record<string, any>;
};

export default function BoardGameGallery(props: BoardGameGalleryProps) {
    const theme = useTheme();
    const extraLarge = useMediaQuery(theme.breakpoints.only('xl'));
    const large = useMediaQuery(theme.breakpoints.only('lg'));
    const medium = useMediaQuery(theme.breakpoints.only('md'));
    const small = useMediaQuery(theme.breakpoints.only('sm'));

    const getColumnNum = () => {
		if (extraLarge) {
    		return 5;
		} else if (large) {
    		return 4;
		} else if (medium) {
    		return 3;
		} else if (small) {
    		return 2;
		} else {
    		return 1;
		}
    };

    const filteredSortedGames = BoardGameActions.sortBoardGames(
    	BoardGameActions.filterBoardGames(
    		props.games,
    		props.filters
    	),
    	props.sort
    );

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
    				<img src={game.image} alt={game.name} />
    				<GridListTileBar title={title} />
    			</GridListTile>
		);
	};

	return (
        <div className="board-game-gallery">
            <GridList cols={getColumnNum()} cellHeight={250}>
        		{filteredSortedGames.map(renderBoardGame)}
      		</GridList>
      	</div>
	);
}

