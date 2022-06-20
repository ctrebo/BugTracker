import React from 'react'
import { useParams } from 'react-router-dom'
import SidebarProjectDetail from '../components/SidebarProjectDetail';

const IssuesListProject = () => {
  	const {projectid} = useParams();

  	return (
    	<>
    		<SidebarProjectDetail project_id={projectid} />
			<div>IssuesListProject</div>
    	</>
  	)
}

export default IssuesListProject