import { useState } from "react";

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Issue from "../components/Issue";

const Issues = ({ issues, setIssues }) => {

    const dynamicSort = property => {

        var sortOrder = 1;

        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    };

    const sortEvent = property => {
       setIssues(iss => [...iss.sort(dynamicSort(property))]) 
    };

    


    return (
        <>
            <div className="bg-white menu">
                <Row className="mx-0 py-2 px-1 gx-1 gx-md-4">
                    <Col xs={2} className="text-center" onClick={()=>sortEvent('name')} ><i>Name</i></Col>
                    <Col xs={3} className="text-center" onClick={()=>sortEvent('description')} ><i>Description</i></Col>
                    <Col xs={3} className="text-center" onClick={()=>sortEvent('-priority')} ><i>Priority</i></Col>
                    <Col xs={2} className="" onClick={()=>sortEvent('status')} ><i>Status</i></Col>
                    <Col xs={2} className="text-center" onClick={()=>sortEvent('due')} ><i>Due to</i></Col>
                </Row>
            </div>
            <div>
                { issues.map(issue => <Issue key={issue.id} issue={issue} />) }
            </div>
        </>
    )

};

export default Issues
