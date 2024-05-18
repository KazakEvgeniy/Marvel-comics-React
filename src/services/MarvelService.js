

class MarvelService {


	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKay = 'apikey=153c9186606b945f54e6d09a227923fd';
	_baseOffset = 200;
	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKay}`);

		return res.data.results.map(this._transformCharacter);
	}




	getHaracter = async (id) => {
		const res = await this.getResource(`${this._apiBase}/characters/${id}?/&${this._apiKay}`);
		return this._transformCharacter(res.data.results[0]);
	}



	_transformCharacter = (char) => {

		if (!char.description) {
			char.description = "Without a description";
		}
		if (char.description.length > 100) {
			char.description = char.description.slice(0, 100) + "…";
		}
		if (char.name.length > 25) {
			char.name = char.name.slice(0, 25) + "…"
		}

		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items

		}
	}

}

export default MarvelService;

