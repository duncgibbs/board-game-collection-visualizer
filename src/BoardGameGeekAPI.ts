type CollectionDataObject = {
	id: string | null;
	name: string | null;
	description: string | null;
	image: string | null;
	thumbnail: string | null;
	yearpublished: string | null;
	minplayers: string | null;
	maxplayers: string | null;
	playingtime: string | null;
	minplaytime: string | null;
	maxplaytime: string | null;
	boardgamecategory: (string | null)[];
	boardgamemechanic: (string | null)[];
	boardgamefamily: (string | null)[];
	boardgamedesigner: (string | null)[];
	boardgameartist: (string | null)[];
	boardgamepublisher: (string | null)[];
};

const getTagValue = (elem: Element, name: string) => {
	return elem.getElementsByTagName(name)[0].getAttribute('value');
};

const getLinkValue = (elem: Element, name: string) => {
	return Array.from(elem.querySelectorAll(`link[type=${name}]`)).map(link => link.getAttribute('value'));
};

const getDataObjectFromThing = (thing: Element): CollectionDataObject => {
    return {
		id: thing.getAttribute('id'),
		name: thing.querySelector('name[type="primary"]')!.getAttribute('value'),
		description: thing.getElementsByTagName('description')[0].innerHTML,
		image: thing.getElementsByTagName('image')[0].innerHTML,
        thumbnail: thing.getElementsByTagName('thumbnail')[0].innerHTML,
        yearpublished: getTagValue(thing, 'yearpublished'),
        minplayers: getTagValue(thing, 'minplayers'),
        maxplayers: getTagValue(thing, 'maxplayers'),
        playingtime: getTagValue(thing, 'playingtime'),
        minplaytime: getTagValue(thing, 'minplaytime'),
        maxplaytime: getTagValue(thing, 'maxplaytime'),
        boardgamecategory: getLinkValue(thing, 'boardgamecategory'),
        boardgamemechanic: getLinkValue(thing, 'boardgamemechanic'),
        boardgamefamily: getLinkValue(thing, 'boardgamefamily'),
        boardgamedesigner: getLinkValue(thing, 'boardgamedesigner'),
        boardgameartist: getLinkValue(thing, 'boardgameartist'),
        boardgamepublisher: getLinkValue(thing, 'boardgamepublisher')
	};
};

const BoardGameGeekAPI = {
    getCollectionForUser: (username: string) => {
        return fetch(`https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&excludesubtype=boardgameexpansion&own=1`)
            .then((response: Response) => response.text())
            .then((text: string) => {
                let domParser = new DOMParser();
                return domParser.parseFromString(text, "text/xml");
            })
            .then((xmlCollectionResponse) => {
                return Promise.all(Array.from(xmlCollectionResponse.getElementsByTagName('item')).map(collectionItem => {
                    const id = collectionItem.getAttribute('objectid')!;
                    return BoardGameGeekAPI.getBoardGame(id);
                }));
            });
    },

    getBoardGame: async (id: string) => {
		return fetch(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}&type=boardgame`)
			.then((response: Response) => response.text())
			.then((text: string) => {
                let domParser = new DOMParser();
            	return domParser.parseFromString(text, "text/xml").getElementsByTagName('item')[0];
			})
			.then((xmlThingResponse) => {
                return getDataObjectFromThing(xmlThingResponse);
			});
	}
};

export default BoardGameGeekAPI;
