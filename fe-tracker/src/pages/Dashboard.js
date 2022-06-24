import { useEffect, useState } from "react";
import { Row, Col, Container, Modal } from "react-bootstrap"
import Project from "../components/Project";
import Issue from "../components/Issue";
import AddProjectForm from "../components/AddProjectForm";

const Dashboard = ({ projects, issues, logged_in_user, setProjects }) => {
    // Modal states and functions
    const [showAddProject, setShowAddProject] = useState(false);
    const handleCloseAddProject = () => setShowAddProject(false);
    const handleShowAddProject = () => setShowAddProject(true);


    const [filterAssignedToMe, setFilterAssignedToMe] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login');
        }
            
    }, []);
    const issues_by_assigned = issues.filter(issue => issue.assigned_to.username === logged_in_user.username);
    const issues_by_creator = issues.filter(issue => issue.creator.username === logged_in_user.username);

    const classes_filter = "text-center mb-0 py-1 px-2 px-md-3 d-inline-block cursor-pointer"

    return (
        <Container className="pt-4">
            <Row>
                <Col xs={12} md={6} className="mt-4 mt-md-0">
                    <div>
                        <h6 className="d-inline-block">Projects</h6><i className="fa fa-plus text-success float-end cursor-pointer" style={{ fontSize: '1.15em' }} onClick={handleShowAddProject}></i>
                        <Modal show={showAddProject} onHide={handleCloseAddProject} backdrop="static" keyboard={false} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Create new Project</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><AddProjectForm logged_in_user={logged_in_user} handleCloseAddProject={handleCloseAddProject} setProjects={setProjects} projects={projects}/></Modal.Body>
                        </Modal>
                        <div className="overflow-section border-sections">
                            <header></header>
                            <div>
                                {projects.map(project => <Project key={project.id} project={project} />)}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h6>Issues </h6>
                        <div className="overflow-section border-sections">
                            <header className="p-2 header">
                                <b>Filters: {' '}</b>
                                <small className={`${classes_filter} ${filterAssignedToMe ? 'bg-turquoise rounded-pill text-white' : 'text-dark'}`} onClick={() => setFilterAssignedToMe(true)}>Assigned to me ({issues_by_assigned.length})</small>
                                <small className={`${classes_filter} ms-md-3 ${!filterAssignedToMe ? 'bg-turquoise rounded-pill text-white' : 'text-dark'}`} onClick={() => setFilterAssignedToMe(false)}>Created by me ({issues_by_creator.length})</small>
                            </header>
                            <div className="bg-white menu">
                                <Row className="mx-0 py-2 px-1 gx-1 gx-md-4">
                                    <Col xs={2} className="text-center">Name</Col>
                                    <Col xs={3} className="text-center">Description</Col>
                                    <Col xs={3} className="text-center">Priority</Col>
                                    <Col xs={2} className="">Status</Col>
                                    <Col xs={2} className="text-center">Due to</Col>
                                </Row>
                            </div>
                            <div>
                                {filterAssignedToMe ? issues_by_assigned.map(issue => <Issue key={issue.id} issue={issue} />) : issues_by_creator.map(issue => <Issue key={issue.id} issue={issue} />)}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={6} className="mt-4 mt-md-0">
                    <div>
                        <h6>Projects</h6>
                        <div className="overflow-section border-sections">
                            <header></header>
                            <div>
                                {projects.map(project => <Project key={project.id} project={project} />)}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard