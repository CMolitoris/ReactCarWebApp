import React, {useState, useEffect, useLayoutEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import './PostCar.css';
import { Image } from 'cloudinary-react';
import Card from 'react-bootstrap/Card'
import './PostCar.css';

const PostCar = (props) => {
    
    const [car, setCar] = useState({
        price: '',
        make: '',
        model: '',
        year: '',
        type: '',
        description: '',
        mileage: '',
        image: ''
    });

    const [newFormData, setNewFormData] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [imageResponseData, setImageResponseData] = useState("");
    const [carData, setCarData] = useState([]);
    

    const handleChange = (event) => {
        event.persist();
        setCar((car) => ({
            ...car,
            [event.target.name]: event.target.value,
        }));
        
    }

    useEffect(() => {
        getAllCarPhotos();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        //-- Update value types to correspond with database --//
        car.mileage = parseInt(car.mileage);
        car.year = parseInt(car.year);
        car.price = parseFloat(car.price);
        
        try {
        //-- Upload image to third-party API and store information in server --//
        let response = await axios.post(`https://api.cloudinary.com/v1_1/cmolitoris/image/upload`,newFormData)
        // car.image = response.data.url
        // setCar(prevstate => ({
        //     ...prevstate,
        //     image: response.data.url
        // }));

        //-- Post car/object data to server --//
        // props.postCar(car,props.sellerFlag,response.data.url);
        await axios.post('https://localhost:44394/api/car/', car);
        let responseCarId = await axios.get('https://localhost:44394/api/car/cars/last');
        let carId = responseCarId.data;
        await axios.post(`https://localhost:44394/api/sellerphotos/`,{
                UserId: props.user.id,
                imageResponseData: response.data.url,
                CarId: carId
        });
        } catch (e) {
            console.log(e);
        } finally {
            getAllCarPhotos(); 
        }
           
    }   

    const fileSelecterHandler = (event) => {
        console.log(event.target.files[0]);
        const formData = new FormData();
        formData.append("file",event.target.files[0]);
        formData.append("upload_preset","fbbvpjgu");
        setNewFormData(formData);
        setImageFile(event.target.files[0]);
    }


    const getAllCarPhotos = async () => {
        console.log(carData);  
        let userId = props.user.id;
        let response = await axios.get(`https://localhost:44394/api/sellerphotos/${userId}`);
        console.log(response.data);
        setCarData(response.data); 
    }

    const handleRemoveCar = async (carId) => {
        try {
            await axios.delete(`https://localhost:44394/api/car/delete/${carId}`);
            getAllCarPhotos();
        } catch(e) {
            console.log("Error in handleRemove: " + e);
        }
    }


    return ( 
        <div className='container mx-auto my-auto overflow-hidden shadow ' id="seller-panel">
            <div className = "row ">
                
                <div className="col-md-2 side-panel side-panel-height overflow-auto">
                    <div className='row details-font mt-5 justify-content-center side-panel-title '>Listed Cars</div>
                    <div className='row justify-content-center '>
                        {/* <p className = "mt-3 h3" >
                            {imageResponseData && <Image className="postCarImage" cloudName="cmolitoris" publicId={imageResponseData} />}
                            {console.log(carData)}
                            {carData[0].car.make}
                            
                        </p> */}
                        <React.Fragment>
                        {carData.map((element, i) => {
                            return (
                                <Card key={i} className="shadow m-1 p-3" style={{ height: '15rem', width: '11rem' }} id='card'>
                                    <Card.Img variant="top" src={element.imageResponseData} className='shadow' id='card'/>
                                    <Card.Body >
                                    <Card.Title>{element.car.make} {element.car.model}</Card.Title>
                                        <hr />
                                    <Card.Text >
                                        <Button onClick={() => handleRemoveCar(element.car.id)} id="form-button-style" variant="primary">Delete</Button>
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                        </React.Fragment>
                    </div>
                </div>
           
            <div className="col-lg-8 p-4 mx-auto" >
                <h2 className='post-title-font mt-4 mb-4'>Post a New Listing!</h2>
                {imageFile && <img className="postCarImage shadow" id='card' src={URL.createObjectURL(imageFile)}></img>}
                <form onSubmit={(event) => handleSubmit(event)} className='put'>
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlID='file'>
                                <Form.Label>Photo:</Form.Label>
                                <Form.Control className='form-control shadow m-1' name='file' type='file' onChange={fileSelecterHandler} />
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
                    <Button variant="secondary" className='shadow mt-4 m-1' id='form-button-style' type="submit"  >
                        Submit
                    </Button>
                </form>
            </div>
        
            </div>
        </div>
     );
}

export default PostCar;