import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


const PostCar = (props) => {
    const [car, setCar] = useState({
        price: props.car.price,
        make: props.car.make,
        model: props.car.model,
        year: props.car.year,
        type: props.type,
        description: props.description,
        mileage: props.car.mileage,
        averageRating: 0.0
    })

    const handleChange = (event) => {
        event.persist();
        setCar((car) => ({
            ...car,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = (event, car) => {
        event.preventDefault();
        props.postCar(car)
    }

    return ( 
        <form onSubmit={handleSubmit} className='put'>
            <Row className='mb-3'>
                <Form.Group as={Col} controlID='make'>
                        <Form.Label>Make:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-left' name='make' value={car.make} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='model'>
                        <Form.Label>Model:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-right' name='model' value={car.model} onChange={handleChange} />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} controlID='year'>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-left' name='year' value={car.year} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='genre'>
                        <Form.Label>Type:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-middle' name='type' value={car.type} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='price'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-middle' name='price' value={car.price} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='mileage'>
                        <Form.Label>Mileage:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-middle' name='mileage' value={car.mileage} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='description'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-middle' name='description' value={car.description} onChange={handleChange} />
                </Form.Group>
            </Row>
            <Button variant="secondary" className='shadow mt-4 m-1' id='submit-button' type="submit"  >
                Submit
            </Button>
        </form>
     );
}

export default PostCar;