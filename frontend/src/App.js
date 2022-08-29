import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import PrivateRoutes from './utils/PrivateRoutes';


import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import IssuesListProject from './pages/IssuesListProject';
import IssueDetail from './pages/IssueDetail';
import Profilpage from './pages/Profilpage';
import SidebarProjectDetail from './components/SidebarProjectDetail';
import NavbarComp from './components/NavbarComp';
import { AuthProvider } from './context/AuthContext';

const App = () => {
	const [projects, setProjects] = useState([]);
	const [issues, setIssues] = useState([]);


	useEffect(() => {
		const execute = async () => {
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

	// const fetchLoggedInUser = async () => {
	// 	const res = await axios.get('/tracker/auth/user/', {
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: `Token ${localStorage.getItem('token')}`
	// 		}
	// 	});
	// 	setLoggedInUser(res.data);
	// };

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
            <AuthProvider>
                <NavbarComp />
                <main id="main" className='bg-dashboard'>
                    <Routes>
                        <Route element={<PrivateRoutes />}>

                            <Route path="/" element={<Dashboard projects={projects} setProjects={setProjects} issues={issues} />} />
                           {/*  <Route path="/project/:projectid/issues" element={<IssuesListProject/>} /> 
                             <Route path="/project/:projectid/issue/:issueid" element={<IssueDetail />} />
                             <Route path="/profil-page" element={<Profilpage />} /> */}
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                         {/* <Route path="/sidebar" element={<SidebarProjectDetail />} /> */}
                    </Routes>
                </main>
            </AuthProvider>
		</Router>
	);
}

export default App;
