import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import RangeSliderFilter from './RangeSliderFilter';
import YearPublishedFilter from './YearPublishedFilter';
import CheckListFilter from './CheckListFilter';

import BoardGameActions from '../../../BoardGameActions';

type FilterListProps = {
	collection: Array<Record<string, any>>;
	filters: Record<string, any>;
	setFilters: (filters: Record<string, any>) => void;
	closeDrawer: () => void;
};

export default function FilterList(props: FilterListProps) {
	const collection = props.collection;
	const filters = props.filters;
	const setFilters = props.setFilters;

    const gameData = BoardGameActions.getFilterData(collection);

	const rangeFilters = [
		{
			filter: 'playercount',
			title: 'Player Count',
			track: 'normal',
			step: 1,
			range: {min: gameData.minPlayerCount, max: gameData.maxPlayerCount}
    	},
    	{
			filter: 'playtime',
			title: 'Play Time',
			track: 'normal',
			step: 5,
			range: {min: gameData.minPlayTime, max: gameData.maxPlayTime}
    	}
    ];
    const checklistFilters = ['category', 'mechanic', 'family', 'designer', 'artist', 'publisher'];

    return (
		<List disablePadding={true}>
			<ListSubheader>
				<Typography variant='h5'>Filters</Typography>
				<Button onClick={props.closeDrawer} className='close-btn'>Close</Button>
			</ListSubheader>
			{rangeFilters.map(rangeFilter => {
				return (
					<ListItem key={rangeFilter.filter}>
    					<RangeSliderFilter
    						title={rangeFilter.title}
    						classes={`${rangeFilter.filter}-slider`}
    						track={rangeFilter.track as (false | 'normal' | 'inverted')}
    						step={rangeFilter.step}
    						range={rangeFilter.range}
    						currentFilter={filters[rangeFilter.filter] ?
        						[filters[rangeFilter.filter].min, filters[rangeFilter.filter].max] :
        						undefined
        					}
        					setFilter={results => {
    							const newFilter: Record<string, any> = {};
    							newFilter[rangeFilter.filter] = {
    								min: results[0],
    								max: results[1]
    							};
    							setFilters({...filters, ...newFilter});
        					}}
        				/>
        			</ListItem>
				);
			})}
            <ListItem>
				<YearPublishedFilter
					years={gameData.years}
					currentFilter={filters['yearpublished'] ?
						[filters['yearpublished'].min, filters['yearpublished'].max] :
						undefined
					}
                    setFilter={(years) => {
						const yearPublishedFilter = {'yearpublished': {
    						min: years[0],
    						max: years[1]
						}};
						setFilters({...filters, ...yearPublishedFilter});
					}}
				/>
			</ListItem>
			{checklistFilters.map(filter => {
                const filterName = `boardgame${filter}`;
				return (
					<ListItem key={filterName}>
						<CheckListFilter
							title={filter}
							classes={`${filter}-checklist`}
							options={gameData[filter]}
							currentFilter={filters[filterName] || []}
							setFilter={(results) => {
    							let resultsObject: Record<string, any> = {};
    							resultsObject[filterName] = results;
								setFilters({...filters, ...resultsObject});
							}}
						/>
					</ListItem>
				);
			})}
		</List>
	);
};
