import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

	// с классовых на функциональные

	// state = {
	// 	charList: [],
	// 	loading: true,
	// 	error: false,
	// 	newItemLoading: false,
	// 	offset: 210,
	// 	charEnded: false
	// }



	const [charList, setCharList] = useState([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(310);
	const [charEnded, setCharEnded] = useState(false);


	// marvelService = new MarvelService();
	const { loading, error, getAllCharacters } = useMarvelService();




	// componentDidMount() {
	// 	// this.marvelService.getAllCharacters()
	// 	// 	.then(this.onCharListLoaded)
	// 	// 	.catch(this.onError)

	// 	this.onRequest();
	// }


	// если пустой массив то эта функция выполнится только один раз при создании компонента

	useEffect(() => {
		onRequest(offset, true);
	}, [])


	// onRequest = (offset) => {
	// 	this.onCharListLoading();
	// 	this.marvelService.getAllCharacters(offset)
	// 		.then(this.onCharListLoaded)
	// 		.catch(this.onError)
	// }



	// const onRequest = (offset) => {
	// 	this.onCharListLoading();
	// 	this.marvelService.getAllCharacters(offset)
	// 		.then(this.onCharListLoaded)
	// 		.catch(this.onError)
	// }


	const onRequest = (offset, initial) => {

		initial ? setNewItemLoading(false) : setNewItemLoading(true)

		setNewItemLoading(true);
		getAllCharacters(offset)
			.then(onCharListLoaded)
		// .catch(onError)
	}


	// onCharListLoading = () => {
	// 	this.setState({
	// 		newItemLoading: true,
	// 	})
	// }


	// const onCharListLoading = () => {
	// 	setNewItemLoading(true)
	// }

	// onCharListLoaded = (newCharList) => {
	// 	let ended = false;
	// 	if (newCharList.length < 9) {
	// 		ended = true
	// 	}

	const onCharListLoaded = (newCharList) => {



		let ended = false;
		if (newCharList.length < 9) {
			ended = true
		}


		// const { logger, second } = await import("./someFanc");
		// second();
		// let ended = false;
		// if (newCharList.length < 9) {
		// 	ended = true
		// }





		// this.setState(({ offset, charList }) => (
		// 	{
		// 		charList: [...charList, ...newCharList],
		// 		loading: false,
		// 		newItemLoading: false,
		// 		offset: offset + 9,
		// 		charEnded: ended,
		// 	}
		// ))

		setCharList(charList => [...charList, ...newCharList]);
		// setLoading(loading => false);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(ended => ended);

	}

	// const onError = () => {
	// 	// this.setState({
	// 	// 	error: true,
	// 	// 	loading: false
	// 	// })

	// 	setError(true);
	// 	setLoading(loading => false);
	// }

	// itemRefs = [];
	const itemRefs = useRef([])


	// удалим и функцию напишем внутри рефа
	// setRef = (ref) => {
	// 	this.itemRefs.push(ref);
	// }

	// focusOnItem = (id) => {

	// 	this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
	// 	this.itemRefs[id].classList.add('char__item_selected');
	// 	this.itemRefs[id].focus();
	// }


	const focusOnItem = (id) => {

		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}







	function renderItems(arr) {

		const items = arr.map((item, i) => {


			let imgStyle = { 'objectFit': 'cover' };
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { 'objectFit': 'unset' };
			}




			return (
				<li

					className="char__item"
					tabIndex={0}
					ref={el => itemRefs.current[i] = el}
					key={item.id}
					onClick={() => {
						props.onCharSelected(item.id);
						focusOnItem(i);
					}
					}

					onKeyDown={(e) => {
						if (e.key === ' ' || e.key === "Enter") {
							props.onCharSelected(item.id);
							focusOnItem(i);
						}
					}}

				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			)
		});

		return (
			<ul className="char__grid">
				{items}
			</ul>
		)
	}



	// const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

	const items = renderItems(charList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;
	// const content = !(loading || error) ? items : null;



	// Динамический импорт всегда возвращает Promise с объектом модуля


	// if (loading) {
	// 	import("./someFanc")
	// 		.then(obj => obj.logger())
	// 		.catch()
	// }


	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				onClick={() => onRequest(offset)}
				style={{ "display": charEnded ? "none" : "block" }}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	)

}

export default CharList;