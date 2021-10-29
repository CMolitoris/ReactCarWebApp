import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
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
        props.toggleModal()
        props.register(registerValues)
    }

    const hideModal = () => {
        props.toggleModal();
        window.location = "/";
    }

    return (
        <div>
            <Offcanvas placement="end" show = {props.modalShow} onHide = {hideModal}>
                <OffcanvasHeader closeButton>
                    <OffcanvasTitle className = "offCanvasTitle" >Register</OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <form className = "my-auto" onSubmit={registerUser}>
                        <Form.Group className='my-1' controlId='registerUser'>
                            <Row>
                                <Col lg={6}>
                                    <Form.Control placeholder="First Name.." name="firstname" onChange={handleChange} value={registerValues.firstname}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Form.Control placeholder="Last Name.." name="lastname" onChange={handleChange} value={registerValues.lastname}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Form.Control placeholder="Username.." name="username" onChange={handleChange} value={registerValues.username}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Form.Control placeholder="Password.." name="password" onChange={handleChange} value={registerValues.password}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Form.Control placeholder="Email.." name="email" onChange={handleChange} value={registerValues.email}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Form.Control placeholder="Phone Number.." name="phonenumber" onChange={handleChange} value={registerValues.phonenumber}/>
                                </Col>
                            </Row>
                            <Row className = "buttonRow">
                                <Col lg={3}>
                                    <Button className='btn btn-md btn-danger shadow' type="submit">Submit</Button>
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