import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);

    const {loginUser} = useContext(AuthContext);
    
    return (
        <Container className="pt-5">
            <Row>
                <Col xs={12} className="m-auto text-center">
                    <h1>Login Page</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={8} className="m-auto" >
                    <Form onSubmit={event=>loginUser(event, username, password, setErrors)} className="mt-5">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        {errors === true && <p className="text-danger">Cannot login with provided credentials</p>}
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
};

export default Login;
