import React, { useState } from 'react';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import { FormGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, FormControl } from 'react-bootstrap';


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
        window.location = "/";
    }


    return ( 
        <div>
            
            <Offcanvas placement = "end" show = {props.modalShow} onHide = {hideModal}>
                <OffcanvasHeader closeButton>
                    <OffcanvasTitle>Log In</OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <form className = "my-auto" onSubmit={loginUser}>
                        <FormGroup>
                            <label htmlFor="inputUsername">Username</label>
                            <FormControl name = "UserName" type="text" value={loginValues.UserName} onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="inputPass">Password</label>
                            <FormControl name = "Password" type="text" value={loginValues.Password} onChange={handleChange}/>
                        </FormGroup>
                        <button className = "btn btn-danger" type = "submit">Log In</button>
                    </form>
                </OffcanvasBody>
            </Offcanvas>
        </div>
     );
}
 
export default Login;