
import './search-panel.css';
import { Component } from 'react';





class SerchPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			term: ''
		}
	}

	updateSearch = (e) => {
		const term = e.target.value;
		this.setState({ term });
		this.props.onUpdateSearch(term);
	}

	render() {


		return (
			<input
				type="text"
				className="form-control search-input"
				placeholder="Найти сотрудника"
				value={this.state.term}
				onChange={this.updateSearch}
			/>
		)
	}

}

export default SerchPanel;