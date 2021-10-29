import React, { useState } from 'react';
import { FormGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, FormControl, Col, Button } from 'react-bootstrap';


const Login = (props) => {
    const [loginValues, setLoginValues] = useState({UserName: "", Password: ""});

    const handleChange = (event) => {
        setLoginValues(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const loginUser = (event) => {
        event.preventDefault()
        props.toggleModal('loginModalShow')
        props.login(loginValues);
    }

    const hideModal = () => {
        props.toggleModal();
    }


    return ( 
        <div>
            
            <Offcanvas placement = "end" show = {props.modalShow} onHide = {hideModal}>
                <OffcanvasHeader closeButton>
                    <OffcanvasTitle className = "offCanvasTitle">Log In</OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <form className = "my-auto" onSubmit={loginUser}>
                        <FormGroup className = "registerInput">
                            <label htmlFor="inputUsername">Username</label>
                            <FormControl name = "UserName" placeholder = "JohnDoe123" type="text" value={loginValues.UserName} onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup className = "registerInput">
                            <label htmlFor="inputPass">Password</label>
                            <FormControl name = "Password" placeholder = "Shhh... this one's a secret" type="password" value={loginValues.Password} onChange={handleChange}/>
                        </FormGroup>
                        <Col className = "submitButton" align = "center">
                            <Button className = "btn btn-md shadow" id = "form-button-style" type = "submit">Log In</Button>
                        </Col>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </div>
     );
}
 
export default Login;