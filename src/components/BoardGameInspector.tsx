import React from 'react';

import Button from '@material-ui/core/Button';

type BoardGameInspectorProps = {
	game: Record<string, any>;
	closeDrawer: () => void;
};

export default function BoardGameInspector(props: BoardGameInspectorProps) {
    const game = props.game;

	return (
		<div className='inspector-container'>
			<Button
				onClick={() => props.closeDrawer()}
				className='close-btn'
				variant='outlined'
			>
				Close
			</Button>
    		<div className='board-game-info'>
    			<div className='cover'>
        			<img src={game.image} alt={game.name} />
    			</div>
        		<div className='basic-info'>
    				<div className='title'>
    					<h2>{game.name}</h2>
    				</div>
        			<div className='players'>
        				<strong>Players<br /></strong>
    					{
    						(game.minplayers === game.maxplayers) ?
    						`${game.minplayers}` :
    						`${game.minplayers}-${game.maxplayers}`
    					}
            		</div>
            		<div className='playtime'>
        				<strong>Playing Time<br /></strong>
    					{
    						(game.minplaytime === game.maxplaytime) ?
    						`${game.minplaytime}` :
    						`${game.minplaytime}-${game.maxplaytime}`
    					}
            		</div>
            		<div className='yearpublished'>
    					<strong>Year Published<br /></strong>
        				{game.yearpublished}
            		</div>
            	</div>
    			<div className='advanced-info'>
    				{[
        				{title: 'Categories', prop: 'boardgamecategory'},
        				{title: 'Mechanics', prop: 'boardgamemechanic'},
        				{title: 'Families', prop: 'boardgamefamily'},
        				{title: 'Designers', prop: 'boardgamedesigner'},
        				{title: 'Artists', prop: 'boardgameartist'},
        				{title: 'Publishers', prop: 'boardgamepublisher'},
            		].map(advInfo => {
    					return (
    						<div className={advInfo.prop} key={advInfo.prop}>
    							<strong>{advInfo.title}<br /></strong>
    							{game[advInfo.prop].join(', ')}
    						</div>
    					);
                	})}
    			</div>
        		<div className='description'>
        			<strong>Description<br /></strong>
        			<p>{game.description.trim()}</p>
        		</div>
    		</div>
    	</div>
	);
};
