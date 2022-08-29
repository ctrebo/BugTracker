import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import SidebarProjectDetail from "../components/SidebarProjectDetail"

const Profilpage = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <SidebarProjectDetail />
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    this is a test
                </Col>
            </Row>
        </Container>
    )
}

export default Profilpage
