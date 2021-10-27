import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { Row, Col, Button, Form , FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Seller from '../Seller/Seller';
import { Link } from 'react-router-dom';

const EditAccount = (props) => {

    const [accountValues, setAccountValues] = useState({
        streetaddress: "",
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
        <div className='container mx-auto my-auto' id="main-panel">
            <div className = "row">
                <div className="col-md-3"><Button><Link to='/seller' className='nav-link'>Post Car</Link></Button></div>
                    <div className="col-md-6" align = "left">
                        <Form onSubmit = {handleSubmit}>
                            <FormGroup as = {Row}>
                                <FormLabel column sm={3}>Street address</FormLabel>
                                <Col>
                                    <FormControl onChange = {handleChange} name = "streetaddress" value = {accountValues.streetaddress} placeholder="Ex: 123 Main St" />
                                </Col>
                            </FormGroup>
                            <FormGroup as = {Row}>
                                <FormLabel column sm={3}>City</FormLabel>
                                <Col>
                                    <FormControl onChange = {handleChange} name = "city" value = {accountValues.city} placeholder = "Chicago"/>
                                </Col>
                            </FormGroup>
                            <FormGroup as = {Row}>
                                <FormLabel column sm= {3}>State</FormLabel>
                                <Col>
                                    <FormControl onChange = {handleChange} name = "state" value = {accountValues.state} placeholder = "Illinois"/>
                                </Col>
                            </FormGroup>
                            <div align = "center">
                                <Button className = "justify-content-center"variant = "danger" type = "submit">Update Account</Button>
                            </div>
                        </Form>
                    </div>
                <div className="col-md-3"></div>
            </div>
        </div>
     );
}
 
export default EditAccount;