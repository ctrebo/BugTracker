import  {createContext, useEffect, useState} from "react";
import useAxios from './../utils/useAxios';

const ProjectContext = createContext({});
export default ProjectContext;

export const ProjectProvider = ({children}) => {
    const [projects, setProjects] = useState([]);
    const api = useAxios();

    const fetchProjects = async() => {
        const res = await api.get("/tracker/get-projects-by-user/", {
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

