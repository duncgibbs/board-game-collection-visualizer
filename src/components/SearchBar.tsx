import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import BoardGameGeekAPI from '../BoardGameGeekAPI';

type SearchBarProps = {
    collection: Array<Record<string, any>>;
	setCollection: (collection: Array<Record<string, any>>) => void;
	collectionSort: string;
	setCollectionSort: (collectionSort: string) => void;
};

export default function SearchBar(props: SearchBarProps) {
    const urlParams = new URLSearchParams(window.location.search);

    let [username, setUsername] = useState('');
    
    const sortableColumns = [
		{name: 'name', display: 'Name'},
		{name: 'yearpublished', display: 'Year Published'},
    	{name: 'minplayers', display: 'Minimum Players'},
        {name: 'maxplayers', display: 'Maximum Players'},
        {name: 'playingtime', display: 'Play Time'}
    ];

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.charCode === 13 || e.key === 'Enter') {
			getBGGCollection();
		}
	};

    const getBGGCollection = () => {
		BoardGameGeekAPI.getCollectionForUser(username)
			.then((userCollection: any[]) => {
				props.setCollection(userCollection);
			});
	};

	const inputLabel = React.useRef<HTMLLabelElement>(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
	    setLabelWidth(inputLabel.current!.offsetWidth);
	}, []);
	
	return (
        <div className="search-bar">
            <TextField
                id="collection-username"
                label="Username"
                variant="outlined"
                onKeyUp={handleKeyUp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value); }}
            />
            <FormControl variant="outlined">
                <InputLabel ref={inputLabel} htmlFor="outlined-sort-native-simple">Sort</InputLabel>
                <Select
                    native
                    value={props.collectionSort}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                        props.setCollectionSort(e.target.value as string);
                    }}
                    labelWidth={labelWidth}
                    inputProps={{
                        name: 'sort',
                        id: 'outlined-sort-native-simple',
                    }}
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
		</div>
	);
}
