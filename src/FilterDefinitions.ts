type FilterDefinitionType = Record<string, (...args: any) => boolean>;

const FilterDefinitions: FilterDefinitionType = {
	rangeFilter: (gameMin: number, gameMax: number, rangeMin: number, rangeMax: number) => {
    	return (
    		(gameMin >= rangeMin ||
    		gameMax >= rangeMin) &&
    		(gameMin <= rangeMax ||
    		gameMax <= rangeMax)
    	);
	},
	listFilter: (gameList: string[], filterList: string[]) => {
    	if (filterList.length) {
    		return gameList.some(val => filterList.includes(val));
    	} else {
        	return true;
    	}
	},
	'playercount': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.rangeFilter(game.minplayers, game.maxplayers, filter.min, filter.max);
	},
    'playtime': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.rangeFilter(game.minplaytime, game.maxplaytime, filter.min, filter.max);
	},
    'yearpublished': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.rangeFilter(game.yearpublished, game.yearpublished, filter.min, filter.max);
	},
    'boardgamecategory': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.listFilter(game.boardgamecategory, filter);
	},
    'boardgamemechanic': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.listFilter(game.boardgamemechanic, filter);
	},
    'boardgamefamily': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.listFilter(game.boardgamefamily, filter);
	},
    'boardgamedesigner': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.listFilter(game.boardgamedesigner, filter);
	},
    'boardgameartist': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.listFilter(game.boardgameartist, filter);
	},
    'boardgamepublisher': (game: Record<string, any>, filter: Record<string, any>) => {
		return FilterDefinitions.listFilter(game.boardgamepublisher, filter);
	},
};

export default FilterDefinitions;
