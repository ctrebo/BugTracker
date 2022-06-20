import {useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import SidebarProjectDetail from '../components/SidebarProjectDetail'


const ProjectDetail = ({fetchProject}) => {
	const [project, setProject] = useState();
	const {projectid} = useParams();

	useEffect(()=> {
		const getProject = async () => {
			const fetched_project = await fetchProject(projectid);
			setProject(fetched_project);
		};

		getProject();
	}, []);

	return (
		<>
			<SidebarProjectDetail project_id={projectid}/>
			<Container>
				<Row></Row>
			</Container>
		</>
	)
}

export default ProjectDetail