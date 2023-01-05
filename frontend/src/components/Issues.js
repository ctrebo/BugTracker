import { useState } from "react";

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Issue from "../components/Issue";

const Issues = ({ issues}) => {

    const filterIssuesByAttribute = attribute => {
        
    };


    return (
        <>
            <div className="bg-white menu">
                <Row className="mx-0 py-2 px-1 gx-1 gx-md-4">
                    <Col xs={2} className="text-center" onClick={()=>filterIssuesByAttribute('')}><i>Name</i></Col>
                    <Col xs={3} className="text-center"><i>Description</i></Col>
                    <Col xs={3} className="text-center"><i>Priority</i></Col>
                    <Col xs={2} className=""><i>Status</i></Col>
                    <Col xs={2} className="text-center"><i>Due to</i></Col>
                </Row>
            </div>
            <div>
                { issues.map(issue => <Issue key={issue.id} issue={issue} />) }
            </div>
        </>
    )

};

export default Issues
