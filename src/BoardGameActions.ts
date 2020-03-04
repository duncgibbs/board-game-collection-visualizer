import FilterDefinitions from './FilterDefinitions';

const ascendingSorts = ['maxplayers'];

const BoardGameActions = {
	sortBoardGames: (games: Array<Record<string, any>>, sortKey: string) => {
        games.sort((gameOne, gameTwo) => {
            if (ascendingSorts.includes(sortKey)) {
                return gameTwo[sortKey] - gameOne[sortKey];
            } else if (sortKey === 'name') {
				return gameOne[sortKey].localeCompare(gameTwo[sortKey]);
            } else {
            	return gameOne[sortKey] - gameTwo[sortKey];
            }
    	});

    	return games;
	},
	filterBoardGames: (games: Array<Record<string, any>>, filters: Record<string, any>) => {
		return games.filter(game => {
			const filterBools = Object.keys(filters).map(filterKey => {
				return FilterDefinitions[filterKey](game, filters[filterKey]);
			});

			return !filterBools.includes(false);
		});
	},
	getFilterData: (games: Array<Record<string, any>>) => {
        const addIfNotPresent = (arr: string[], val: string) => {
			if (!arr.includes(val)) {
    			arr.push(val);
    			arr.sort();
			}
			
			return arr;
    	};

    	const incrementEntry = (obj: Record<string, number>, val: string) => {
			if (obj.hasOwnProperty(val)) {
    			obj[val] += 1;
			} else {
    			obj[val] = 1;
			}

			return obj;
    	};

    	return games.reduce((filterData: Record<string, any>, game: Record<string, any>) => {
        	return {
				minPlayerCount: Math.min(filterData.minPlayerCount, game.minplayers),
				maxPlayerCount: Math.max(filterData.maxPlayerCount, game.maxplayers),
				minPlayTime: Math.min(filterData.minPlayTime, game.minplaytime),
				maxPlayTime: Math.max(filterData.maxPlayTime, game.maxplaytime),
				years: addIfNotPresent(filterData.years, game.yearpublished),
                category: game.boardgamecategory.reduce(incrementEntry, filterData.category),
    			mechanic: game.boardgamemechanic.reduce(incrementEntry, filterData.mechanic),
    			family: game.boardgamefamily.reduce(incrementEntry, filterData.family),
    			designer: game.boardgamedesigner.reduce(incrementEntry, filterData.designer),
    			artist: game.boardgameartist.reduce(incrementEntry, filterData.artist),
    			publisher: game.boardgamepublisher.reduce(incrementEntry, filterData.publisher)
        	};
    	}, {
			minPlayerCount: Infinity,
			maxPlayerCount: -Infinity,
			minPlayTime: Infinity,
			maxPlayTime: -Infinity,
			years: [],
			category: {},
			mechanic: {},
			family: {},
			designer: {},
			artist: {},
			publisher: {}
       	});
	}
};

export default BoardGameActions;
