import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import Landing from '../Landing/Landing';

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
        props.register(registerValues)
    }

    const hideModal = () => {
        props.toggleModal();
        window.location = "/";
    }

    return (
        <div>
            <Modal show = {props.modalShow} onHide = {hideModal}>
                <ModalHeader closeButton>
                    <ModalTitle>Register</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form className = "my-auto" onSubmit={registerUser}>
                        <Form.Group as={Row} className='my-1' controlId='registerUser'>
                            <Col lg={3}>
                                <Form.Control placeholder="First Name.." name="firstname" onChange={handleChange} value={registerValues.firstname}/>
                            </Col>
                            <Col lg={7}>
                                <Form.Control placeholder="Last Name.." name="lastname" onChange={handleChange} value={registerValues.lastname}/>
                            </Col>
                            <Col lg={3}>
                                <Form.Control placeholder="Username.." name="username" onChange={handleChange} value={registerValues.username}/>
                            </Col>
                            <Col lg={7}>
                                <Form.Control placeholder="Password.." name="password" onChange={handleChange} value={registerValues.password}/>
                            </Col>
                            <Col lg={3}>
                                <Form.Control placeholder="Email.." name="email" onChange={handleChange} value={registerValues.email}/>
                            </Col>
                            <Col lg={7}>
                                <Form.Control placeholder="Phone Number.." name="phonenumber" onChange={handleChange} value={registerValues.phonenumber}/>
                            </Col>
                            <Col lg={1}>
                                <Button className='btn btn-md btn-danger shadow' onClick = {props.toggleModal} type="submit">Submit</Button>
                            </Col>
                        </Form.Group>
                    </form>
            </ModalBody>
            </Modal>
            <Landing />
       </div>
    );
    
}
 
export default RegisterUser;