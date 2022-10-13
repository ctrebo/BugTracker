import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SidebarProjectDetail from '../components/SidebarProjectDetail';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectContext from '../context/ProjectContext';
import AuthContext from '../context/AuthContext';


const ProjectDetail = () => {

    const [project, setProject] = useState({});
    const {fetchProject, canAccessProject} = useContext(ProjectContext);
    const {user} = useContext(AuthContext);
    const {projectid} = useParams();
    const navigate = useNavigate()
    

    useEffect(()=>{
         
        const getValues = async () => {
            const res = await fetchProject(projectid);
            
            if (!canAccessProject(res, user.username)) {
                navigate('/')           
            }
            setProject(await fetchProject(projectid));
        }
        getValues();
        // if (project.creator.username != user.username && !project.team_members.includes(user)) {
        //     navigate('dashboard/')           
        // }
        
    }, [])
    return (
        <>
            <SidebarProjectDetail />            
            <Container className="pt-4">
                <Row>
                    <Col xs={12} md={8} className="">
                        <article className="img-project-detail-wrap d-inline-block">
                            <img src={project.picture} className="img-fluid w-100 h-100 rounded"/>
                        </article>
                        <h3 className="d-inline-block fw-normal ms-3">{project.name}</h3>
                    </Col>
                </Row>
            </Container>
        </>
    ) 
}

export default ProjectDetail;
