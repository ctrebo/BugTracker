import {useEffect, useState,} from 'react'
import { useParams } from 'react-router-dom'
import SidebarProjectDetail from '../components/SidebarProjectDetail';

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"

import Issues from "../components/Issues"

import useAxios from "../utils/useAxios";

const IssuesListProject = () => {
  	const {projectid} = useParams();
    const [issues, setIssues] = useState([]);

    const api = useAxios();

    useEffect(()=>{
		const execute = async () => {
			await getIssues();
		};
		execute();

    }, []);

    const getIssues = async ()=> {
        const res = await api.get(`/tracker/issuesByProject/${projectid}/`); 
        setIssues(res.data) 
    };

  	return (
        <>
            <SidebarProjectDetail project_id={projectid} />            
            <Container className="pt-5">
                <Row className="mb-4">
                    <Col xs={12} md={6} className="text-center m-auto">
                        <h3 className="text-decoration-underline">Project issues</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        <Issues issues={issues} setIssues={setIssues}/>
                    </Col>
                </Row>
            </Container>
        </>
  	)
}

export default IssuesListProject
