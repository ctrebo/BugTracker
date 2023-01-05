import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"

import React, { useContext, useEffect, useState } from "react";
import Project from "../components/Project";
import Issue from "../components/Issue";
import Issues from "../components/Issues";
import AddProjectForm from "../components/AddProjectForm";
import ProjectContext from './../context/ProjectContext'
import useAxios from "../utils/useAxios";


const Dashboard = () => {
    // Modal states and functions
    const [issuesCreatedByUser, setIssuesCreatedByUser] = useState([]);
    const [issuesAssignedToUser, setIssuesAssignedToUser] = useState([]);
    const [filterAssignedToMe, setFilterAssignedToMe] = useState(true);
    const [showAddProject, setShowAddProject] = useState(false);



    const api = useAxios();
    const { projects } = useContext(ProjectContext);
    const handleCloseAddProject = () => setShowAddProject(false);
    const handleShowAddProject = () => setShowAddProject(true);

    useEffect(() => {
        const execute = async () => {
            await getObjects();
        };
        execute();
    }, [])



    const getObjects = async () => {
        const res = await api.get("/tracker/dashboard/", {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setIssuesCreatedByUser(res.data["issues_created_by_user"]);
        setIssuesAssignedToUser(res.data["issues_assigned_to_user"]);
    };

    const classes_filter = "text-center mb-0 py-1 px-2 px-md-3 d-inline-block cursor-pointer"


    return (
        <Container className="pt-5">
            <Row>
                <Col xs={12} md={6} className="mt-4 mt-md-0">
                    <div>
                        <h6 className="d-inline-block">Projects</h6><i className="fa fa-plus text-success float-end cursor-pointer" style={{ fontSize: '1.15em' }} onClick={handleShowAddProject}></i>
                        <Modal show={showAddProject} onHide={handleCloseAddProject} backdrop="static" keyboard={false} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Create new Project</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><AddProjectForm handleCloseAddProject={handleCloseAddProject} /></Modal.Body>
                        </Modal>
                        <div className="overflow-section border-sections">
                            <header></header>
                            <div>
                                {projects ? projects.map(project => <Project key={project.id} project={project} />) : ''}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h6>Issues</h6>
                        <div className="overflow-section border-sections">
                            <header className="p-2 header">
                                <b>Filters: {' '}</b>
                                <small className={`${classes_filter} ${filterAssignedToMe ? 'bg-turquoise rounded-pill text-white' : 'text-dark'}`} onClick={() => setFilterAssignedToMe(true)}>Assigned to me ({issuesAssignedToUser.length})</small>
                                <small className={`${classes_filter} ms-md-3 ${!filterAssignedToMe ? 'bg-turquoise rounded-pill text-white' : 'text-dark'}`} onClick={() => setFilterAssignedToMe(false)}>Created by me ({issuesCreatedByUser.length})</small>
                            </header>
                            <section>
                                <Issues issues={filterAssignedToMe ? issuesAssignedToUser : issuesCreatedByUser} />
                            </section>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={6} className="mt-4 mt-md-0">
                    <div>
                        <h6>Projects</h6>
                        <div className="overflow-section border-sections">
                            <header></header>
                            <div>
                                {projects ? projects.map(project => <Project key={project.id} project={project} />) : ''}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
