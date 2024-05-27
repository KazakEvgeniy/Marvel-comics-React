import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleIncrease, onToggleRise }) => {

	const elements = data.map((item, i) => {
		const { id, ...itemProps } = item;
		return (

			// <EmployeesListItem name={item.name} salary={item.salary} />
			<EmployeesListItem
				key={i}
				{...itemProps}
				onDelete={() => { onDelete(id) }}
				onToggleIncrease={() => onToggleIncrease(id)}
				onToggleRise={() => onToggleRise(id)}
			/>

		)
	})

	return (
		<ul className="app-list list-group">
			{/* <EmployeesListItem name="John" salary={800} />
			<EmployeesListItem name="Alex" salary={3000} />
			<EmployeesListItem name="Carl" salary={5000} /> */}
			{elements}
		</ul>
	)
}





export default EmployeesList;