import { Component } from "react";
import "./app.css";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from '../employees-add-form/employees-add-form';







class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: "John", salary: 500, increase: true, rise: true, id: 1 },
				{ name: "Alex", salary: 2500, increase: false, rise: false, id: 2 },
				{ name: "Carl", salary: 5000, increase: false, rise: false, id: 3 },
			],
			term: "",
			filter: "all"

		}
		this.maxId = 4
	}


	deleteItem = (id) => {
		this.setState(({ data }) => {
			// const index = data.findIndex(elem => elem.id === id);
			// нужно соблюдать прицип иммутабельности и не удалять старый объект из state

			// const before = data.slice(0, index);
			// const after = data.slice(index + 1);
			// const newArr = [...before, ...after];



			return {
				// data: newArr
				data: data.filter(item => item.id !== id)
			}
		})
	}

	addItem = (name, salary) => {
		const newItem = {
			name,
			salary,
			rise: false,
			increase: false,
			id: this.maxId++
		}
		this.setState(({ data }) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}
		});
	}

	onToggleIncrease = (id) => {
		this.setState(({ data }) => ({
			// const index = data.findIndex(elem => elem.id == id);
			// const old = data[index];
			// const newItem = { ...old, increase: !old.increase };
			// const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
			// return {
			// 	data: newArr
			// }

			// или

			data: data.map(item => {
				if (item.id === id) {
					return { ...item, increase: !item.increase }
				} return item
			})

		}))

	}


	onToggleRise = (id) => {
		this.setState(({ data }) => ({

			data: data.map(item => {
				if (item.id === id) {
					return { ...item, rise: !item.rise }
				} return item
			})

		}))
	}

	// onToggleProp = (id, prop) => {
	// 	this.setState(({ data }) => ({

	// 		data: data.map(item => {
	// 			if (item.id === id) {
	// 				return { ...item, [prop]: !item[prop] }
	// 			} return item
	// 		})

	// 	}))
	// }

	searchEmp = (items, term) => {
		if (term.length == 0) {
			return items
		}
		return items.filter(item => {
			return item.name.indexOf(term) > -1
		})
	}

	onUpdateSearch = (term) => {
		// this.setState({ term: term })
		// то же самое
		this.setState({ term })
	}


	filterPost = (items, filter) => {
		switch (filter) {
			case "rise":
				return items.filter(item => item.rise);
			case "moreThen1000":
				return items.filter(item => item.salary > 1000);
			default: return items
		}
	}


	onFilterSelect = (filter) => {
		this.setState(({ filter }));
	}

	render() {
		const { data, term, filter } = this.state;
		let increasePeople = data.filter(item => item.increase).length;
		let numberPeople = data.length;


		const visileDate = this.filterPost(this.searchEmp(data, term), filter);


		return (
			<div className="app" >
				<AppInfo numberIncrease={increasePeople} numberEmployees={numberPeople} />
				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
				</div>
				<EmployeesList
					onToggleIncrease={this.onToggleIncrease}
					onToggleRise={this.onToggleRise}
					onDelete={this.deleteItem}
					data={visileDate} />
				<EmployeesAddForm onAdd={this.addItem} />
			</div>
		)
	}



}

export default App;