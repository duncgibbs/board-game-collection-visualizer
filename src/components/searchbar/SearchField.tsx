import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

type SearchFieldProps = {
	setUsername: (username: string) => void;
};

export default function SearchField(props: SearchFieldProps) {
    let [search, setSearch] = useState('');

    let updateUsername = props.setUsername;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('username')) {
			updateUsername(urlParams.get('username') as string);
			setSearch(urlParams.get('username') as string);
        }
    }, [updateUsername]);

    const inputLabel = useRef<HTMLLabelElement>(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
	    setLabelWidth(inputLabel.current!.offsetWidth);
	}, []);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.charCode === 13 || e.key === 'Enter') {
			updateUsername(search);
		}
	};

    const renderSearchButton = () => {
        return (
			<InputAdornment position="end">
                <IconButton
                	onClick={() => updateUsername(search)}
                	className='search-bar-button'
                	edge='end'
                >
                    <FontAwesomeIcon icon={faSearch} />
                </IconButton>
			</InputAdornment>
        );
    };

	return (
        <FormControl className='search-bar-input' variant='outlined'>
            <InputLabel ref={inputLabel} htmlFor="username-search">Username</InputLabel>
			<OutlinedInput
                id='username-search'
                value={search}
                onKeyUp={handleKeyUp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); }}
                endAdornment={renderSearchButton()}
                labelWidth={labelWidth}
            />
		</FormControl>
	);
};
