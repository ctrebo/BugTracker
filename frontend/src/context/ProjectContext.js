import  {createContext, useEffect, useState} from "react";
import useAxios from './../utils/useAxios';

const ProjectContext = createContext({});
export default ProjectContext;

export const ProjectProvider = ({children}) => {
    const [projects, setProjects] = useState([]);
    const api = useAxios();

	useEffect(() => {
        const execute = async () => {
            await fetchProjects();
        }
        execute();
	}, []);

    const fetchProjects = async() => {
        const res = await api.get("/tracker/get-projects-by-user/");
        setProjects(res.data);
    };

	const fetchProject = async (id) => {
		const res = await api.get(`/tracker/project/${id}/`);

		return res.data;
	};

    const deleteProject = async id => {
        const res = await api.delete(`/tracker/project/${id}/`);
        if (res.status === 204) {
            fetchProjects();
        } else {
            alert("Something went wrong!");
        }
    };

    const usernameInTeamMembers = (project, username) => {
        for (const user of project.team_members) {
            if(user.username === username) {
                return true;
            }
        }
        return false;
    };

    const canAccessProject = (project, username) => {
        return (project.creator.username === username || usernameInTeamMembers(project, username));
    }


    const contextData = {
        projects: projects,
        setProjects: setProjects,
        fetchProject: fetchProject,
        fetchProjects: fetchProjects,
        deleteProject: deleteProject,
        canAccessProject: canAccessProject,
    }

    return (
        <ProjectContext.Provider value={ contextData }>
            {children}
        </ProjectContext.Provider>
    )
    
};

