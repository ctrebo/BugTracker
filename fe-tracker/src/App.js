import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavbarComp from './components/NavbarComp';
import Profilpage from './pages/Profilpage';

const App = () => {
	const [projects, setProjects] = useState([]);
	const [logged_in_user, setLoggedInUser] = useState({});

	useEffect(() => {
		const execute = async () => {
			await getLoggedInUser();
			await getProjects();
		};

		execute();
	}, [])

	const getProjects = async () => {
		const res = await axios.get("tracker/projects/", {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		});
		setProjects(res.data['projects']);
	};

	const getLoggedInUser = async () => {
		const res = await axios.get('tracker/auth/user/', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		});
		setLoggedInUser(res.data);
	};


	return (
		<Router>
			<NavbarComp />
			<main id="main">
				<Container className="pt-4">
					<Routes>
						<Route path="/" element={<Dashboard projects={projects} />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/profil-page" element={<Profilpage logged_in_user={logged_in_user} />} />
					</Routes>
				</Container>
			</main>
		</Router>
	);
}

export default App;
