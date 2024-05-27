import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";


const Page404 = () => {
	return (
		<>
			<div><ErrorMessage /></div>
			<Link to="/">  Back to main page</Link>
		</>
	)
}

export default Page404;