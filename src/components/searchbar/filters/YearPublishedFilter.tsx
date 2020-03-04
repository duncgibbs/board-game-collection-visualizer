import React, { useState } from 'react';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

type YearPublishedFilterProps = {
	years: number[];
	currentFilter?: number[];
	setFilter: (count: number[]) => void;
};

export default function YearPublishedFilter(props: YearPublishedFilterProps) {
	const [value, setValue] = useState(() => {
		if (props.currentFilter) {
    		const minYear = props.currentFilter[0];
    		const maxYear = props.currentFilter[1];
        	return [props.years.indexOf(minYear), props.years.indexOf(maxYear)];
        } else {
            return [0, props.years.length - 1];
        }
    });

	const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
	};

	const handleChangeCommit = (event: any, filterValue: number | number[]) => {
    	const sliderValues = filterValue as number[];
    	const filterYears = [props.years[sliderValues[0]], props.years[sliderValues[1]]];
		props.setFilter(filterYears);
	};
    
	return (
		<div className='year-published-slider range-slider-filter'>
			<Typography variant='h6' className='filter-list-item-title' gutterBottom>
				Year Published
			</Typography>
			<Typography variant='subtitle1'>
				{props.years[value[0]]} - {props.years[value[1]]}
    		</Typography>
            <Slider
                id='range-slider'
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommit}
                valueLabelDisplay='off'
                aria-labelledby='range-slider'
                min={0}
                max={props.years.length - 1}
                marks={true}
            />
		</div>
	);
};


