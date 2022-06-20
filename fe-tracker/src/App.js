import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import IssueAdd from './pages/IssueAdd';
import IssuesListProject from './pages/IssuesListProject';
import ProjectDetail from './pages/ProjectDetail';
import IssueDetail from './pages/IssueDetail';
import Profilpage from './pages/Profilpage';
import SidebarProjectDetail from './components/SidebarProjectDetail';
import NavbarComp from './components/NavbarComp';


const App = () => {
	const [projects, setProjects] = useState([]);
	const [issues, setIssues] = useState([]);
	const [logged_in_user, setLoggedInUser] = useState({});



	useEffect(() => {
		const execute = async () => {
			await fetchLoggedInUser();
			await getObjects();
		};

		execute();
	}, [])

	const getObjects = async () => {
		const res = await axios.get("/tracker/dashboard/", {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		});
		setProjects(res.data['projects']);
		setIssues(res.data["issues"]);
	};

	const fetchLoggedInUser = async () => {
		const res = await axios.get('/tracker/auth/user/', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		});
		setLoggedInUser(res.data);
	};

	const fetchProject = async (id) => {
		const res = await axios.get(`/tracker/project/${id}/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	};


	return (
		<Router>
			<NavbarComp />
			<main id="main" className='bg-dashboard'>
				<Routes>
					<Route path="/" element={<Dashboard projects={projects} issues={issues} logged_in_user={logged_in_user} />} />

					<Route path="/sidebar" element={<SidebarProjectDetail />} />
					<Route path="/project/:projectid" element={<ProjectDetail fetchProject={fetchProject}/>} />
					<Route path="/project/:projectid/issues" element={<IssuesListProject/>} />
					<Route path="/project/:projectid/issues/add" element={<IssueAdd fetchProject={fetchProject} />} />
					<Route path="/project/:projectid/issue/:issueid" element={<IssueDetail />} />

					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/profil-page" element={<Profilpage logged_in_user={logged_in_user} />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
