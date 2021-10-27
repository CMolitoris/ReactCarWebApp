import React, { useState } from 'react';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';


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
            <Modal show = {props.modalShow} onHide = {hideModal}>
                <ModalHeader closeButton>
                    <ModalTitle>Log In</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form className = "my-auto" onSubmit={loginUser}>
                        <div>
                            <label htmlFor="inputUsername">Username</label>
                            <input name = "UserName" type="text" value={loginValues.UserName} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="inputPass">Password</label>
                            <input name = "Password" type="text" value={loginValues.Password} onChange={handleChange}/>
                        </div>
                        <button className = "btn btn-danger" type = "submit">Log In</button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
     );
}
 
export default Login;