import React, { useState, useContext } from "react"
import { Row, Col } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ProjectContext from "../context/ProjectContext";
import DeleteModal from "./DeleteModal"


const Project = ({ project }) => {
    const [onHover, setOnHover] = useState(false);
    const {user} = useContext(AuthContext)

    const [modalShow, setModalShow] = React.useState(false);
    const {deleteProject} = useContext(ProjectContext);

    const navigate = useNavigate();

    return (
        <>
            <section onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
                <article>
                    <Row className={`mx-0 border py-2 ${onHover ? 'bg-turquoise' : 'bg-white'}`}>
                        <Col xs={2}>
                            <div className="img-project-wrap cursor-pointer" onClick={() => navigate(`project/${project.id}`)}>
                                <img src={project.picture} className="img-fluid w-100 h-100"/>
                            </div>
                        </Col>
                        <Col xs={10}>
                            {(user.username === project.creator.username || user.username === project.creator) && onHover?(
                                <i className="fa-solid fa-trash-can float-end text-danger mt-3 cursor-pointer" onClick={() => setModalShow(true)}></i>
                            ) : ''    
                            }
                            <DeleteModal show={modalShow} onHide={() => setModalShow(false)}  object_name="Project" deleteObject={()=>deleteProject(project.id)} />
                            <div>
                                <header>
                                    <Link to={`project/${project.id}`} className={`text-decoration-none ${onHover ? 'text-white' : 'text-dark'}`}>{project.name}</Link>
                                </header>
                                {onHover ? (
                                    <article className="text-white">
                                        <small>
                                            <Link className="text-decoration-none text-white" to={`project/${project.id}/issues`}>Issues</Link> |{' '}
                                            <Link to={`project/${project.id}/issues/add`} className="text-decoration-none text-white">Add Issue</Link>
                                        </small>
                                    </article>
                                ) : (
                                    <small>{project.field}</small>
                                )}

                            </div>
                        </Col>
                    </Row>
                </article>
            </section>
        </>
    )
}

export default Project
