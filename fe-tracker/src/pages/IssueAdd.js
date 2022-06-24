import SidebarProjectDetail from '../components/SidebarProjectDetail'
import AddIssueForm from '../components/AddIssueForm'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const IssueAdd = ({logged_in_user, fetchProject}) => {
	const {projectid} = useParams();
	const [project, setProject] = useState({});

	useEffect(()=> {
		const getProject = async () => {
			const fetched_project = await fetchProject(projectid);
			setProject(fetched_project);
		}

		getProject();
	}, []);

  	return (
    	<>
      		<SidebarProjectDetail project_id={projectid}/>
			<Container>
				<Row>
					<Col xs={12}>
						<AddIssueForm project={project} />
					</Col>
				</Row>
			</Container>
    	</>
	)
}

export default IssueAdd