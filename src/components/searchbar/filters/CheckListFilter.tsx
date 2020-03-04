import React, { useState } from 'react';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type CheckListFilterProps = {
	title: string;
	classes: string;
	options: Record<string, number>;
	currentFilter: string[];
	setFilter: (filters: string[]) => void;
};

export default function CheckListFilter(props: CheckListFilterProps) {
    const [seeAll, setSeeAll] = useState(false);

    const sortedOptions = Object.keys(props.options).sort((optionOne, optionTwo) => {
		return props.options[optionTwo] - props.options[optionOne];
    });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    	const category = e.target!.value;
    	if (props.currentFilter.includes(category)) {
			props.setFilter(props.currentFilter.filter(filterCat => filterCat !== category));
    	} else {
        	props.setFilter([...props.currentFilter, category]);
    	}
	};

    const renderOptionCheckbox = (option: string) => {
		return (
			<div className='check-list-option' key={option.toLocaleLowerCase()}>
    			<FormControlLabel
    				control={
               			 <Checkbox
               			 	color='default'
               			 	checked={props.currentFilter.includes(option)}
               			 	onChange={handleChange}
               			 	value={option}
               			 />
    				}
    				label={option}
    			/>
    			<Chip label={`${props.options[option]}`} variant='outlined' />
    		</div>
		);
    };
    
	return (
        <div className={props.classes}>
        	<Typography variant='h6' gutterBottom>
        		{props.title}
            </Typography>
            <div className='check-list-container'>
                {sortedOptions.slice(0,10).map(renderOptionCheckbox)}
                <Collapse in={seeAll} unmountOnExit>
					{sortedOptions.slice(10).map(renderOptionCheckbox)}
                </Collapse>
                <Button onClick={() => setSeeAll(!seeAll)}>
					{seeAll ? 'Hide' : 'See All'}
                </Button>
            </div>
        </div>
	);
};
