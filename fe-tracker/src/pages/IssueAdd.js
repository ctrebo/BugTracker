import SidebarProjectDetail from '../components/SidebarProjectDetail'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const IssueAdd = () => {
	const {projectid} = useParams();

  	return (
    	<>
      		<SidebarProjectDetail project_id={projectid}/>
			<Container>
				Issue add
			</Container>
    	</>
	)
}

export default IssueAdd