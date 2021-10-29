import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { Row, Col, Button, Form , FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Seller from '../Seller/Seller';
import { Link } from 'react-router-dom';
import './EditAccount.css'

const EditAccount = (props) => {

    const [accountValues, setAccountValues] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
    })

    const handleChange = (event) => {
        setAccountValues(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        props.updateDetails(accountValues)
        window.location = '/account';
    }

    return ( 
        <div className='container mx-auto my-auto overflow-hidden shadow' id="product-panel">
            <div className = "row">
                <div className="col-md-3 side-panel side-panel-height">
                    <div className='row h1 mt-5 justify-content-center side-panel-title'>Account Links</div>
                    <div className='row justify-content-center'>
                        <p
                            className = "mt-3 h3" >
                            <Link 
                                to='/seller' 
                                className = "nav-link">
                                    Post Car
                            </Link>
                        </p>
                    </div>
                </div>
                    <div className="col-md-6 p-5" align = "left">
                        <div className='row'>
                            <p className='h1 mb-4 text-center form-panel-title'>Edit Details</p>
                        </div>
                        <div className='row'>
                            <Form onSubmit = {handleSubmit}>
                                <FormGroup as = {Row}>
                                    <FormLabel column sm={3}>
                                        <p className='form-label-font'>User Name</p>
                                    </FormLabel>
                                    <Col className='pt-3'>
                                        <FormControl onChange = {handleChange} name = "firstName" value = {accountValues.firstName} placeholder="John" />
                                    </Col>
                                </FormGroup>
                                <FormGroup as = {Row}>
                                    <FormLabel column sm={3}>
                                        <p className='form-label-font'>First Name</p>
                                    </FormLabel>
                                    <Col className='pt-3'>
                                        <FormControl onChange = {handleChange} name = "firstName" value = {accountValues.firstName} placeholder="John" />
                                    </Col>
                                </FormGroup>
                                <FormGroup as = {Row}>
                                    <FormLabel column sm={3}>
                                        <p className='form-label-font'>Last Name</p>
                                    </FormLabel>
                                    <Col className='pt-3'>
                                        <FormControl onChange = {handleChange} name = "lastName" value = {accountValues.lastName} placeholder="Doe" />
                                    </Col>
                                </FormGroup>
                                <FormGroup as = {Row}>
                                    <FormLabel column sm={3}>
                                        <p className='form-label-font'>Number</p>
                                    </FormLabel>
                                    <Col className='pt-3'>
                                        <FormControl onChange = {handleChange} name = "phoneNumber" value = {accountValues.phoneNumber} placeholder="1234567890" />
                                    </Col>
                                </FormGroup>
                                <FormGroup as = {Row}>
                                    <FormLabel column sm={3}>
                                        <p className='form-label-font'>Email</p>
                                    </FormLabel>
                                    <Col className='pt-3'>
                                        <FormControl onChange = {handleChange} name = "email" value = {accountValues.email} placeholder="johndoe@gmail.com" />
                                    </Col>
                                </FormGroup>
                                <FormGroup as = {Row}>
                                    <FormLabel column sm={3}>
                                        <p className='form-label-font'>Address</p>
                                    </FormLabel>
                                    <Col className='pt-3'>
                                        <FormControl onChange = {handleChange} name = "streetAddress" value = {accountValues.streetAddress} placeholder="Ex: 123 Main St" />
                                    </Col>
                                </FormGroup>
                                <FormGroup as = {Row} className='mt-1'>
                                    <FormLabel column sm={3}>
                                        <p className='form-label-font'>City</p> 
                                    </FormLabel>
                                    <Col className='pt-3'>
                                        <FormControl onChange = {handleChange} name = "city" value = {accountValues.city} placeholder = "Chicago"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup as = {Row}>
                                    <FormLabel column sm= {3}>
                                        <p className='form-label-font'>State</p>
                                    </FormLabel>
                                    <Col className='pt-3'>
                                        <FormControl onChange = {handleChange} name = "state" value = {accountValues.state} placeholder = "Illinois"/>
                                    </Col>
                                </FormGroup>
                                <div align = "center">
                                    <Button className = "justify-content-center shadow" id='form-button-style' type = "submit">Update Account</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                <div className="col-md-3"></div>
            </div>
        </div>
     );
}
 
export default EditAccount;