import  {createContext, useContext, useEffect, useState} from "react";
import useAxios from './../utils/useAxios';
import AuthContext from "./AuthContext";

const ProjectContext = createContext({});
export default ProjectContext;

export const ProjectProvider = ({children}) => {
    const [projects, setProjects] = useState([]);
    const axiosIn = useAxios();

    const fetchProjects = async() => {
        const res = await axiosIn.get("/tracker/get-projects-by-user/", {
			headers: {
				'Content-Type': 'application/json',
			}
		});
        setProjects(res.data);
    };

	useEffect(() => {
        fetchProjects();
	}, []);

    const contextData = {
        projects: projects,
        setProjects: setProjects,
    }

    return (
        <ProjectContext.Provider value={ contextData }>
            {children}
        </ProjectContext.Provider>
    )
    
};

