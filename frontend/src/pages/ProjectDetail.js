import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SidebarProjectDetail from '../components/SidebarProjectDetail';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectContext from '../context/ProjectContext';


const ProjectDetail = () => {

    const [project, setProject] = useState({});
    const {fetchProject} = useContext(ProjectContext);
    const {projectid} = useParams();

    useEffect(()=>{
        const getValues = async () => {
            setProject(await fetchProject(projectid));
        }
        getValues();
    }, [])
    return (
        <>
            <SidebarProjectDetail />            
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        {project.name}     
                    </Col>
                </Row>
            </Container>
        </>
    ) 
}

export default ProjectDetail;
