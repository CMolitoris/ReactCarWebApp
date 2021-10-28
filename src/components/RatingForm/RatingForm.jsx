import React, {useState} from 'react';
import { FormControl, Form, Button, FloatingLabel } from 'react-bootstrap';

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
            Message: ratingValues.Message,
            CarId: props.carID
        })
        setRatingValues(() => ({
            RatingScore: "", 
            Message: "", 
            CarId: "", 
        }))
    }


    return ( 
        <>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Group>
                    <FloatingLabel controlId="floatingSelectGrid" label="Rating">
                        <FormControl 
                            type="text"
                            placeholder="0 - 10"
                            className="mr-2 form-control"
                            aria-label='Rating'
                            name='RatingScore'
                            onChange={handleChange}
                            size= "sm"
                            value={ratingValues.RatingScore}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel controlId="floatingInputGrid" label="Review">
                        <FormControl 
                            type="text"
                            placeholder="What's your thoughts..."
                            className="mr-2 form-control"
                            aria-label='Message'
                            name='Message'
                            onChange={handleChange}
                            size= "sm"
                            value={ratingValues.Message}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Button className="btn btn-secondary" type='submit' size = "sm">Submit</Button>
            </Form>
        </>
     );
}
export default RatingForm;