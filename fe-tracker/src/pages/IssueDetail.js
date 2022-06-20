import React from "react";
import { useParams } from 'react-router-dom';
import SidebarProjectDetail from '../components/SidebarProjectDetail'

const IssueDetail = () => {
	const {projectid} = useParams();

  	return (
		<>
			<SidebarProjectDetail project_id={projectid} />
		</>
	);
};

export default IssueDetail;
