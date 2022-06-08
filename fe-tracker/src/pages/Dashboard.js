import { useEffect } from "react";
import { Row, Col } from "react-bootstrap"
import Project from "../components/Project";

const Dashboard = ({ projects }) => {
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login');
        }
    }, []);

    return (
        <div className="">
            <Row>
                <Col xs={12} md={6} className="mt-4 mt-md-0 overflow-section">
                    <section>
                        <h6>Projects</h6>
                         {projects.map(project => <Project key={project.id} project={project} />)}
                    </section>
                    <section className="">
                        <h6>My Issue</h6>

                    </section>
                </Col>
                <Col xs={12} md={6} className="mt-4 mt-md-0">
                    <h6>Projects</h6>
                    {projects.map(project => <Project key={project.id} project={project} />)}
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard