import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import useAxios from "../utils/useAxios"

const Profilpage = () => {
    const [user, setUser] = useState({});

    const api = useAxios();

    const getLoggedInUser = async () => {
        const res = api.get("/logged-in-user/");
        setUser(res.data);
    };

    useEffect(()=>{
        
    }, [])

    return (
        <Container>
            <Row>
                <Col xs={2} id="sidebar-wrapper">

                </Col>
                <Col xs={10} id="page-content-wrapper">
                    {user.first_name}
                </Col>
            </Row>
        </Container>
    )
}

export default Profilpage
