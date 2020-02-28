import React, { useState } from 'react';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

type RangeSliderFilterProps = {
    title: string;
    classes: string;
	range: Record<string, number>;
	currentFilter?: number[];
	step?: number | null;
	track: false | 'normal' | 'inverted';
	setFilter: (count: number[]) => void;
};

export default function RangeSliderFilter(props: RangeSliderFilterProps) {
	const [value, setValue] = useState(() => {
		if (props.currentFilter) {
        	return props.currentFilter;
        } else {
            return [props.range.min, props.range.max];
        }
    });

	const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
	};

	const handleChangeCommit = (event: any, filterValue: number | number[]) => {
		props.setFilter(filterValue as number[]);
	};
    
	return (
		<div className={props.classes}>
			<Typography id='range-slider' variant='h6' gutterBottom>
				{props.title}
			</Typography>
			<Typography variant='subtitle1'>
				{value[0]} - {value[1]}
    		</Typography>
            <Slider
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommit}
                valueLabelDisplay='off'
                aria-labelledby='range-slider'
                min={props.range.min}
                max={props.range.max}
                track={props.track}
                marks={true}
                step={props.step}
            />
		</div>
	);
};

