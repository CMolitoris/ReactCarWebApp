import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import axios from 'axios';
import './PostCar.css';
import { Image } from 'cloudinary-react';

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
    const [newFormData, setNewFormData] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [imageResponseData, setImageResponseData] = useState("");

    

    const handleChange = (event) => {
        event.persist();
        setCar((car) => ({
            ...car,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //-- Update value types to correspond with database --//
        car.mileage = parseInt(car.mileage);
        car.year = parseInt(car.year);
        car.price = parseFloat(car.price);

        //-- Upload image to third-party API and store information in server --//
        let response = await axios.post(`https://api.cloudinary.com/v1_1/cmolitoris/image/upload`,newFormData)
        console.log(response);
         //-- Post car/object data to server --//
         props.postCar(car,props.sellerFlag,response.data.url);
       
    }


    const fileSelecterHandler = (event) => {
        console.log(event.target.files[0]);
        const formData = new FormData();
        formData.append("file",event.target.files[0]);
        formData.append("upload_preset","fbbvpjgu");
        setNewFormData(formData);
        setImageFile(event.target.files[0]);
        
    }

    const fileUploadHandler = async () => {
        let response = await axios.post(`https://api.cloudinary.com/v1_1/cmolitoris/image/upload`,newFormData)
        console.log(response);
        setImageResponseData(response.data.url);
        console.log(imageResponseData);  
    }

    return ( 
        <div className='container mx-auto my-auto overflow-hidden shadow' id="product-panel">
            <div className = "row">
                <div className="col-md-3 side-panel side-panel-height">
                    <div className='row h1 mt-5 justify-content-center side-panel-title'>Listed Cars</div>
                    <div className='row justify-content-center'>
                        <p className = "mt-3 h3" >
                            {imageResponseData && <Image className="postCarImage" cloudName="cmolitoris" publicId={imageResponseData} />}
                        </p>
                    </div>
                </div>
        
           
            <div className="col-lg-8 p-4" align ="center" >
                <h2>Post a New Listing!</h2>
                {imageFile && <img className="postCarImage" src={URL.createObjectURL(imageFile)}></img>}
                <form onSubmit={handleSubmit} className='put'>
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlID='file'>
                                <Form.Label>Photo:</Form.Label>
                                <Form.Control className='form-control shadow m-1' id='input-style-left' name='file' type='file' onChange={fileSelecterHandler} />
                        </Form.Group>
                    </Row>
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
        
            </div>
        </div>
     );
}

export default PostCar;