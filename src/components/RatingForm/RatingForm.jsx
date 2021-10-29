import React, {useState} from 'react';
import { FormControl, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';

const RatingForm = (props) => {

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

    const handleSubmit = (event) => {
        event.preventDefault()
        props.postRating({
            RatingScore: parseFloat(ratingValues.RatingScore),
            CarId: props.carID,
            Message: ratingValues.Message,
            UserName: props.username
        })
        setRatingValues(() => ({
            RatingScore: "", 
            Message: "", 
            CarId: "", 
        }))
    }


    return ( 
        <Row className="g-2 mb-5">
            <h5 className="text-start p-2">Leave a review!</h5>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Col md="auto">
                    <Form.Group>
                        <FloatingLabel controlId="floatingSelectGrid" label="Rating">
                            <Form.Select
                                aria-label='Select rating'
                                name='RatingScore'
                                onChange={handleChange}
                                value={ratingValues.RatingScore}
                            >
                                <option>Select a rating</option>
                                <option value="1">1/5 - Poor</option>
                                <option value="2">2/5 - Below Average</option>
                                <option value="3">3/5 - Average</option>
                                <option value="4">4/5 - Above Average</option>
                                <option value="5">5/5 - Excellent</option>

                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <FloatingLabel controlId="floatingInputGrid" label="Review">
                            <FormControl 
                                type="text"
                                placeholder="What's your thoughts..."
                                aria-label='Message'
                                name='Message'
                                onChange={handleChange}
                                value={ratingValues.Message}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Button variant="primary" type='submit' size = "lg">
                    Submit
                </Button>
            </Form>
        </Row>
     );
}
export default RatingForm;