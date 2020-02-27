import React, { useState, useEffect, useRef } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

type SortSelectProps = {
    currentSort: string;
	selectSort: (sort: string) => void;
};

export default function SortSelect(props: SortSelectProps) {
    const sortableColumns = [
		{name: 'name', display: 'Name'},
		{name: 'yearpublished', display: 'Year Published'},
    	{name: 'minplayers', display: 'Minimum Players'},
        {name: 'maxplayers', display: 'Maximum Players'},
        {name: 'playingtime', display: 'Play Time'}
    ];

    const inputLabel = useRef<HTMLLabelElement>(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
	    setLabelWidth(inputLabel.current!.offsetWidth);
	}, []);

	return (
        <FormControl variant="outlined">
            <InputLabel ref={inputLabel} htmlFor="outlined-sort-native-simple">Sort</InputLabel>
            <Select
                native
                value={props.currentSort}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                    props.selectSort(e.target.value as string);
                }}
                labelWidth={labelWidth}
                inputProps={{
                    name: 'sort',
                    id: 'outlined-sort-native-simple',
                }}
                className={'search-bar-input'}
            >
                {sortableColumns.map(sortable => {
                    return (
                    	<option value={sortable.name} key={sortable.name}>
                    		{sortable.display}
                        </option>
					);
                })}
            </Select>
        </FormControl>
	);
};
