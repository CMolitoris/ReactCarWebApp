import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


const PostCar = (props) => {
    const [car, setCar] = useState({
        price: '',
        make: '',
        model: '',
        year: '',
        type: '',
        description: '',
        mileage: '',
    })

    const handleChange = (event) => {
        event.persist();
        setCar((car) => ({
            ...car,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(car);
        car.mileage = parseInt(car.mileage);
        car.year = parseInt(car.year);
        car.price = parseFloat(car.price);
        await props.postCar(car,props.sellerFlag)
        
    }

    return (
        <div className="col-lg-8 p-4" align = "center" id='main-panel'>
        <h2>Post a New Listing!</h2>
        <form onSubmit={handleSubmit} className='put'>
            <Row className='mb-3'>
                <Form.Group as={Col} controlID='make'>
                        <Form.Label>Make:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-left' name='make' placeholder="Make..." onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='model'>
                        <Form.Label>Model:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-right' name='model' placeholder="Model..." onChange={handleChange} />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} controlID='year'>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-left' name='year' placeholder="Year..." onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='genre'>
                        <Form.Label>Type:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-middle' name='type' placeholder="Type..." onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='price'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-middle' name='price' placeholder="Price..." onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='mileage'>
                        <Form.Label>Mileage:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-middle' name='mileage' placeholder="Mileage..." onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlID='description'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control className='form-control shadow m-1' id='input-style-middle' name='description' placeholder="Description..." onChange={handleChange} />
                </Form.Group>
            </Row>
            <Button variant="secondary" className='shadow mt-4 m-1' id='submit-button' type="submit"  >
                Submit
            </Button>
        </form>
        </div>
     );
}

export default PostCar;