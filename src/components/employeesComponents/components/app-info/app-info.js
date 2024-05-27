import "./app-info.css"

const AppInfo = ({ numberEmployees, numberIncrease }) => {

	return (
		<div className="app-info">
			<h1>Учёт сотрудников в компании №</h1>
			<h2>Общее число сотрудников: {numberEmployees} </h2>
			<h2>Премию получат: {numberIncrease} </h2>
		</div>
	)
}

export default AppInfo;