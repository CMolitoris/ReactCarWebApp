import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Col, Row, Form } from 'react-bootstrap';
import './RegisterUser.css'

const RegisterUser = (props) => {
    
    const [registerValues, setRegisterValues] = useState({firstname: "", lastname: "", username: "", password: "", email: "", phonenumber: ""})

    const handleChange = (event) => {
        setRegisterValues(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const registerUser = (event) => {
        event.preventDefault();
        props.toggleModal();
        props.register(registerValues)
    }

    const hideModal = () => {
        props.toggleModal();
    }

    return (
        <div>
            <Offcanvas placement="end" show = {props.modalShow} onHide = {hideModal}>
                <OffcanvasHeader closeButton>
                    <OffcanvasTitle className = "offCanvasTitle" align = "center">Register</OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <form className = "my-auto" onSubmit={registerUser}>
                        <Form.Group className='my-1' controlId='registerUser'>
                            <Row>
                                <Col className = "registerInput">
                                    <label htmlFor="firstname">First Name</label>
                                    <Form.Control placeholder="John" name="firstname" onChange={handleChange} value={registerValues.firstname}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className = "registerInput">
                                    <label htmlFor="lastname">Last Name</label>
                                    <Form.Control placeholder="Doe" name="lastname" onChange={handleChange} value={registerValues.lastname}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className = "registerInput">
                                    <label htmlFor="username">Username</label>
                                    <Form.Control placeholder="JohnDoe123" name="username" onChange={handleChange} value={registerValues.username}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className = "registerInput">
                                    <label htmlFor="password">Password</label>
                                    <Form.Control placeholder="password1234" type = "password" name="password" onChange={handleChange} value={registerValues.password}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className = "registerInput">
                                    <label htmlFor="email">Email</label>
                                    <Form.Control placeholder="Johndoe@example.com" name="email" onChange={handleChange} value={registerValues.email}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className = "registerInput">
                                    <label htmlFor="phonenumber">Phone Number</label>
                                    <Form.Control placeholder="555-555-555" name="phonenumber" onChange={handleChange} value={registerValues.phonenumber}/>
                                </Col>
                            </Row>
                            <Row className = "buttonRow">
                                <Col className = "submitButton" align= "center">
                                    <Button className='btn btn-md shadow' id = "form-button-style" type="submit">Register</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </form>
            </OffcanvasBody>
            </Offcanvas>
       </div>
    );
    
}
 
export default RegisterUser;