import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://localhost:3000/dashboard');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        const user = {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        };

        fetch('tracker/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://localhost:3000/');
                } else {
                    setUsername('');
                    setEmail('');
                    setPassword1('');
                    setPassword2('');
                    localStorage.clear();
                    setErrors(true);
                }
            });
    };

    return (
        <Container className="pt-4">
            <Row>
                <Col xs={12} md={8} className='m-auto'>
                    {loading === false && <h1>Signup</h1>}
                    {errors === true && <h2>Cannot signup with provided credentials</h2>}
                    <Form onSubmit={onSubmit} className="mt-5">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email adress" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Enter Password" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
};

export default Signup;