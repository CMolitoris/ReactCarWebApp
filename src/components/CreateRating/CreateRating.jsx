import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';

const RegisterUser = (props) => {
    
    const [ratingValues, setRatingValues] = useState({
        RatingScore: "", 
        Message: "", 
        CarId: "", 
    })

    const handleChange = (event) => {
        setRatingValues(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const createRating = (event) => {
        event.preventDefault();
        props.postRating({
            RatingScore: parseFloat(ratingValues.RatingScore),
            Message: ratingValues.Message,
            CarId: props.carId
        })
    }

    const hideModal = () => {
        props.toggleModal();
    }

    return (
        <div>
            <Modal show = {props.modalShow} onHide = {hideModal}>
                <ModalHeader closeButton>
                    <ModalTitle>Create Review</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form className = "my-auto"onSubmit={createRating}>
                        <Form.Group as={Row} className='my-1' controlId='registerUser'>
                            <Col lg={3}>
                                <Form.Control placeholder="0-10" name="RatingScore" onChange={handleChange} value={ratingValues.RatingScore}/>
                            </Col>
                            <Col lg={7}>
                                <Form.Control placeholder="Review.." name="Message" onChange={handleChange} value={ratingValues.Message}/>
                            </Col>
                            <Col lg={1}>
                                <Button className='btn btn-md btn-danger shadow' onClick = {props.toggleModal} type="submit">Submit</Button>
                            </Col>
                        </Form.Group>
                    </form>
            </ModalBody>
            </Modal>
       </div>
    );
    
}
 
export default RegisterUser;