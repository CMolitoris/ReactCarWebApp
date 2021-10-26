import React from 'react';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

const Login = (props) => {
    return ( 
        <Modal show = {props.modalShow} backdrop="static">
            <ModalHeader>
                <ModalTitle>Log In</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form className = "my-auto" onSubmit={(event)=>{this.loginUser(event)}}>
                    <div>
                        <label htmlFor="inputEmail">Username</label>
                    </div>
                    <div>
                        <label htmlFor="inputPass">Password</label>
                    </div>
                </form>
            </ModalBody>
        </Modal>
     );
}
 
export default Login;