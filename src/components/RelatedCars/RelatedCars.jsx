import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton/AddToCartButton';


//? Filters cars by Type and excludes the current car from the list
function RelatedCars(props) {

    return (
        <> 
            {props.cars.filter(
                value => value.type === props.car.type 
                && value.id !== props.car.id
            )
            .map((related)=>(
                <Card key={`relatedCar${related.id}`} className="mb-4 p-2 shadow" id='card'>
                    {/*//? Related Cars - Link to car-details */}
                    <div className=" mt-4">
                        <Link to="/car-details" onClick={() => props.getSingleCar(related)}>
                            <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg" className='card-image shadow'/>
                        </Link>
                    </div>
                    <Card.Body>
                        <Card.Title>{related.make} {related.model}</Card.Title>
                        <Card.Text>
                            ${related.price} | {related.type}
                        </Card.Text>
                        <hr />
                    </Card.Body>
                    {/*//? Related Cars - Add to cart btn */}
                    <div className="mx-auto col-sm-10">
                        <AddToCartButton 
                            addToCart={props.addToCart} 
                            userID={props.user ? props.user.id : null} 
                            carID={related.id} 
                        /> 
                    </div>
                </Card>
            ))}
        </>
     );
}

export default RelatedCars;