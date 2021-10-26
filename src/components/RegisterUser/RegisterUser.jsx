import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            email: '',
            phonenumber: ''
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.registerUser(this.state);
    }

    render() { 
        return ( 
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <Form.Group as={Row} className='my-1' controlId='registerUser'>
                    <Col lg={3}>
                        <Form.Control placeholder="First Name.." name="firstname" onChange={this.handleChange} value={this.state.firstname}/>
                    </Col>
                    <Col lg={7}>
                        <Form.Control placeholder="Last Name.." name="lastname" onChange={this.handleChange} value={this.state.lastname}/>
                    </Col>
                    <Col lg={3}>
                        <Form.Control placeholder="Username.." name="username" onChange={this.handleChange} value={this.state.username}/>
                    </Col>
                    <Col lg={7}>
                        <Form.Control placeholder="Password.." name="password" onChange={this.handleChange} value={this.state.password}/>
                    </Col>
                    <Col lg={3}>
                        <Form.Control placeholder="Email.." name="email" onChange={this.handleChange} value={this.state.email}/>
                    </Col>
                    <Col lg={7}>
                        <Form.Control placeholder="Phone Number.." name="phonenumber" onChange={this.handleChange} value={this.state.phonenumber}/>
                    </Col>
                    <Col lg={1}>
                        <Button className='btn btn-md btn-danger shadow' type="submit">Submit</Button>
                    </Col>
                </Form.Group>
            </form>
         );
    }
}
 
export default RegisterUser;