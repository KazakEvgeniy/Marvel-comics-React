import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types';


class CharInfo extends Component {


	state = {

		char: null,
		loading: false,
		error: false
	}

	marvelService = new MarvelService();


	componentDidMount() {
		this.updateChar();
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}


	updateChar = () => {
		const { charId } = this.props;
		if (!charId) {
			return;
		}

		this.onCharLoading();
		this.marvelService
			.getHaracter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}




	onError = () => {
		this.setState({ loading: false, error: true })
	}

	onCharLoaded = (char) => {
		this.setState({ char, loading: false })
	}

	onCharLoading = () => {
		this.setState({ loading: true })
	}



	render() {

		const { char, loading, error } = this.state;
		const sceletom = char || loading || error ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? <View char={char} /> : null;


		return (
			<div className="char__info">
				{sceletom}
				{errorMessage}
				{spinner}
				{content}
			</div>
		)
	}

}


const View = ({ char }) => {



	const { name, description, thumbnail, homepage, wiki, comics } = char;
	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'contain' };
	}


	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : "There is no comics with this character"}
				{

					comics.map((item, i) => {


						// eslint-disable-next-line
						if (i > 9) {
							return
						}
						return (
							<li key={i} className="char__comics-item">
								{item.name}
							</li>

						)
					})
				}

			</ul>
		</>
	)
}

CharInfo.propTypes = {
	// хотим сказать что charId обязательно должен быть числом
	charId: PropTypes.number
	// хотим сказать что charId обязательно должен быть строкой,тогда получим ошибку

	// charId: PropTypes.string
}


export default CharInfo;