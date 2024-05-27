// import logo from './logo.svg';
import './App.css';
import data from './data';
import { useState, useMemo, useDeferredValue, useTransition } from 'react';

// Эти хуки используют с большими срисками динамических данных

function UseTransitionAndUseDeferredValue() {

	const [text, setText] = useState("");
	const [post, setPost] = useState(data);

	//useDeferredValue  принимает в себя какое-то значение,которое будет потом немного отложенно изменять
	// const deferedVelue = useDeferredValue(text);

	const [isPending, startTransition] = useTransition();


	// const filteresPosts = useMemo(() => {
	// 	return post.filter(item => item.name.toLowerCase().includes(text))
	// }, [text]);

	// const filteresPosts = useMemo(() => {
	// 	return post.filter(item => item.name.toLowerCase().includes(deferedVelue))
	// }, [deferedVelue]);


	const filteresPosts = useMemo(() => {
		return post.filter(item => item.name.toLowerCase().includes(text))
	}, [text]);


	const onValueChange = (e) => {
		startTransition(() => {
			setText(e.target.value)
		})

	}






	return (
		<div className="App">
			<input
				value={text}
				type="text"
				onChange={onValueChange}
			/>
			<br />
			<div>
				{/* {
					filteresPosts.map(post => (
						<div key={post.id}>
							<h4>{post.name}</h4>
						</div>
					))
				} */}

				{/* useTransition */}

				{isPending ? <h4>Loading</h4> :
					filteresPosts.map(post => (
						<div key={post.id}>
							<h4>{post.name}</h4>
						</div>
					))

				}

			</div>


		</div>
	);
}

export default UseTransitionAndUseDeferredValue;
