import React from 'react';

import GridListTileBar from '@material-ui/core/GridListTileBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

type BoardGameTileProps = {
	game: Record<string, any>;
	onClick: (id: string) => void;
};

export default function BoardGameTile(props: BoardGameTileProps) {
    const renderTitle = () => {
        return (
    		<div className='game-info-bar'>
    			<div className='title'>{props.game.name}</div>
    			<div className='players'>
    				<FontAwesomeIcon icon={faUser} />
    				{(props.game.minplayers === props.game.maxplayers) ? (
    					`${props.game.minplayers}`
    				) : (
    					`${props.game.minplayers}-${props.game.maxplayers}`
    				)}
    			</div>
    			<div className='time'>
    				<FontAwesomeIcon icon={faClock} />
    				{(props.game.minplaytime === props.game.maxplaytime) ? (
    					`${props.game.minplaytime}`
    				) : (
    					`${props.game.minplaytime}-${props.game.maxplaytime}`
    				)}
    			</div>
    		</div>
        );
    };

	return (
		<div className='board-game-tile' onClick={() => props.onClick(props.game.id)}>
			<img src={props.game.image} alt={props.game.name} className='bg-thumbnail' />
			<GridListTileBar title={renderTitle()} />
		</div>
	);
};
