

import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
	useLocation,
} from "react-router-dom";
import Userfront, {
	SignupForm,
	LoginForm,
	PasswordResetForm
} from "@userfront/toolkit/react";

export default function Registration() {
	return (

		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/reset">Reset</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/reset" element={<PasswordReset />} />
				<Route
					path="/dashboard"
					element={
						<RequireAuth>
							<DefaultLayout />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>

	);
}

function Home() {
	return (
		<div>
			<h2>Home</h2>
			<SignupForm />
		</div>
	);
}

function Login() {
	return (
		<div>
			<h2>Login</h2>
			<LoginForm />
		</div>
	);
}

function PasswordReset() {
	return (
		<div>
			<h2>Password Reset</h2>
			<PasswordResetForm />
		</div>
	);
}

function DefaultLayout() {
	const userData = JSON.stringify(Userfront.user, null, 2);
	return (
		<div>
			<h2>Dashboard</h2>
			<pre>{userData}</pre>
			<button onClick={Userfront.logout}>Logout</button>
		</div>
	);
}

function RequireAuth({ children }) {
	let location = useLocation();
	if (!Userfront.tokens.accessToken) {
		// Redirect to the /login page
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}


