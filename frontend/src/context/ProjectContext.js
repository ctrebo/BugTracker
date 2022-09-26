import  {createContext, useEffect, useState} from "react";
import useAxios from './../utils/useAxios';

const ProjectContext = createContext({});
export default ProjectContext;

export const ProjectProvider = ({children}) => {
    const [projects, setProjects] = useState([]);
    const api = useAxios();

    const fetchProjects = async() => {
        const res = await api.get("/tracker/get-projects-by-user/");
        setProjects(res.data);
    };

	const fetchProject = async (id) => {
		const res = await api.get(`/tracker/project/${id}/`);

		return res.data;
	};

	useEffect(() => {
        fetchProjects();
	}, []);

    const contextData = {
        projects: projects,
        setProjects: setProjects,
        fetchProject: fetchProject,
    }

    return (
        <ProjectContext.Provider value={ contextData }>
            {children}
        </ProjectContext.Provider>
    )
    
};

