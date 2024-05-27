
// задаём любоое название переменной
import imgError from './error.gif'
const ErrorMessage = () => {
	return (
		// <img src={process.env.PUBLIC_URL + "/error.gif"} />
		<img style={{ display: "block", width: '250px', height: '250px', margin: '0 auto', objectFit: 'contain' }} src={imgError} alt="error" />
	)
}

export default ErrorMessage;