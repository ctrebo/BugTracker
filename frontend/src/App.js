import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import IssuesListProject from './pages/IssuesListProject';
// import IssueDetail from './pages/IssueDetail';
import ProjectDetail from './pages/ProjectDetail';
import Profilpage from './pages/Profilpage';
// import SidebarProjectDetail from './components/SidebarProjectDetail';
import NavbarComp from './components/NavbarComp';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

const App = () => {

	return (
		<Router>
            <AuthProvider>
                <ProjectProvider>
                    <NavbarComp />
                    <main id="main" className='bg-dashboard'>
                        <Routes>
                            <Route element={<PrivateRoutes />}>

                                <Route path="/" element={<Dashboard />} />
                                <Route path="/project/:projectid" element={<ProjectDetail />} />
                               {/*  <Route path="/project/:projectid/issues" element={<IssuesListProject/>} /> 
                                 <Route path="/project/:projectid/issue/:issueid" element={<IssueDetail />} /> */}
                                 <Route path="/profil-page" element={<Profilpage />} /> 
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                             {/* <Route path="/sidebar" element={<SidebarProjectDetail />} /> */}
                        </Routes>
                    </main>
                </ProjectProvider>
            </AuthProvider>
		</Router>
	);
}

export default App;
