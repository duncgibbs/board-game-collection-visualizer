import React, { useState } from 'react';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

type PlayTimeFilterProps = {
	playerCounts: Record<string, number>;
	currentFilter?: number[];
	setPlayerCountFilter: (count: number[]) => void;
};

export default function PlayTimeFilter(props: PlayTimeFilterProps) {
	const [playerCount, setPlayerCount] = useState(() => {
		if (props.currentFilter) {
        	return props.currentFilter;
        } else {
            return [props.playerCounts.min, props.playerCounts.max];
        }
    });

	const handleChange = (event: any, newValue: number | number[]) => {
        setPlayerCount(newValue as number[]);
	};

	const handleChangeCommit = (event: any, filterValue: number | number[]) => {
		props.setPlayerCountFilter(filterValue as number[]);
	};
    
	return (
		<div className='player-count-filter'>
			<Typography id='range-slider' variant='h6' gutterBottom>
				Player Count
			</Typography>
			<Typography variant='subtitle1'>
				{playerCount[0]} - {playerCount[1]}
    		</Typography>
            <Slider
                value={playerCount}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommit}
                valueLabelDisplay='off'
                aria-labelledby='range-slider'
                min={props.playerCounts.min}
                max={props.playerCounts.max}
                step={1}
                marks={true}
            />
		</div>
	);
};

