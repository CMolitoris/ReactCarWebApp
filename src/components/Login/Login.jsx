import React, { useState } from 'react';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';


const Login = (props) => {
    const [loginValues, setLoginValues] = useState({username: "", password: ""});

    const handleChange = (event) => {
        setLoginValues(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const loginUser = () => {
        props.login(loginValues);
    }


    return ( 
        <Modal show = {props.modalShow} backdrop="static">
            <ModalHeader>
                <ModalTitle>Log In</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form className = "my-auto" onSubmit={()=> {loginUser()}}>
                    <div>
                        <label htmlFor="inputUsername">Username</label>
                        <input name = "username" type="text" value={loginValues.username} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="inputPass">Password</label>
                        <input name = "password" type="text" value={loginValues.password} onChange={handleChange}/>
                    </div>
                    <button className = "btn btn-light" type = "submit" onClick={props.toggleModal}>Log In</button>
                </form>
            </ModalBody>
        </Modal>
     );
}
 
export default Login;