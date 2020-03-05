import React, { useState } from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import BoardGameActions from '../BoardGameActions';
import BoardGameTile from './BoardGameTile';
import BoardGameInspector from './BoardGameInspector';

import './BoardGameGallery.css';

type BoardGameGalleryProps = {
	games: Array<Record<string, any>>;
	sort: string;
	filters: Record<string, any>;
};

export default function BoardGameGallery(props: BoardGameGalleryProps) {
	const [selectedGameId, setSelectedGameId] = useState('' as string | null);

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
        return (
			<GridListTile key={game.id}>
				<BoardGameTile game={game} onClick={() => setSelectedGameId(game.id)} />
				<Drawer
					className='board-game-inspector'
					open={selectedGameId === game.id}
					onClose={() => setSelectedGameId(null)}
					anchor='bottom'
				>
					<BoardGameInspector game={game} closeDrawer={() => {
    					setSelectedGameId(null);
    					console.log(selectedGameId);
    				}} />
				</Drawer>
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

