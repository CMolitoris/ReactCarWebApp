import React, {useState} from 'react';
import { FormControl, Form, Button } from 'react-bootstrap';

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
            CarId: props.carId
        })
        setRatingValues(() => ({
            RatingScore: "", 
            Message: "", 
            CarId: "", 
        }))
    }


    return ( 
        <div>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <FormControl 
                    type="text"
                    placeholder="0 - 10"
                    className="mr-2 form-control"
                    aria-label='Comment'
                    name='RatingScore'
                    onChange={handleChange}
                    size= "sm"
                    value={ratingValues.RatingScore}
                />
                <FormControl 
                    type="text"
                    placeholder="What's your thoughts..."
                    className="mr-2 form-control"
                    aria-label='Message'
                    name='message'
                    onChange={handleChange}
                    size= "sm"
                    value={ratingValues.Message}
                />
                <Button className="btn btn-secondary" type='submit' size = "sm">Submit</Button>
            </Form>
        </div>
     );
}
 
export default RatingForm;