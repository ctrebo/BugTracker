import { useState } from "react";
import { Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import {FaArrowUp, FaArrowDown, FaArrowRight} from 'react-icons/fa'

import moment from 'moment'


const Issue = ({issue}) => {
    const [onHover, setOnHover] = useState(false);
    const navigate = useNavigate();

    const getArrow = char => {
        if (char === 'h') {
            return <FaArrowUp className="text-danger" size={28} />;
        } else if (char === 'm') {
            return <FaArrowRight className="text-primary" size={28} />;
        } else if (char === 'l') {
            return <FaArrowDown className="text-success" size={28} />;
        }
    }

    const getStatusClass = char => {
        if (char === 'o') {
            return 'bg-primary';
        } else if (char === 'p') {
            return 'bg-warning';
        } else if (char === 'r') {
            return 'bg-success';
        } 
    };

    const getStatus = char => {
        if (char === 'o') {
            return "Open";
        } else if (char === 'p') {
            return 'In Progress';
        } else if (char === 'r') {
            return 'Resolved';
        } 
    };

    return (    
        <section onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} onClick={()=>navigate(`project/${issue.project.id}/issue/${issue.id}`)} className="cursor-pointer">
            <article>
                <Row className={`mx-0 border py-2 gx-2 ${onHover ? 'bg-yellow' : 'bg-white'}`}>
                    <Col xs={2} className="text-center my-auto">
                        <h6 className="text-success">{issue.name}</h6>                  
                    </Col>
                    <Col xs={4} className="text-issue my-auto">
                        <span>{issue.description}</span>
                    </Col>
                    <Col xs={1} className="text-center my-auto">
                        <span>{getArrow(issue.priority)}</span>
                    </Col>
                    <Col xs={3} className="my-auto">
                        <p className={`text-white text-center mb-0 ms-2 rounded-pill w-100 ${getStatusClass(issue.status)}`}>{getStatus(issue.status)}</p>
                    </Col>
                    <Col xs={2} className="text-issue text-center my-auto">
                        <span>{moment(issue.due).format('MMM DD')}</span>
                    </Col>
                </Row>
            </article>
        </section>
    )
}

export default Issue