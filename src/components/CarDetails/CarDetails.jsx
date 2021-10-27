import React from 'react';
import { Card, Button, Image} from 'react-bootstrap';


function CarDetails(props) {
    console.log(props.car)
    console.log("test")
    return ( 
        <div className="row">
            <div className="col-sm-3 bg-danger">
                TODO: Side Panel for related cars
                {/* {props.cars.filter(value => value.type === props.car[0].type).map((car)=>(
                     <Card>
                     <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg"/>
                     <Card.Body>
                         <Card.Title>{car.make} {car.model}</Card.Title>
                         <Card.Text>
                             $ {car.price}
                         </Card.Text>
                         <hr />
                         <h6 className="font-weight-bold"> Description </h6>
                         <Card.Text>
                             {car.description}
                         </Card.Text>
                     </Card.Body>
                     <Button onClick={() => props.addToCart({
                             UserId: props.user.id,
                             CarId: car.id,
                             Quantity: 1
                         })} variant="success" size="lg">
                         <span class="material-icons">add_shopping_cart</span>
                         Add to Cart
                     </Button>
                 </Card>
                ))} */}
            </div>
            <div className="col-sm-4">
                <Image src="staticImages\Ford_Shelby.jpg" fluid />
            </div>
            <div className="col-sm-4">
                <Card>
                    <Card.Body>
                        <Card.Title>{props.car.make}</Card.Title>
                        <Card.Text>{props.car[0].make}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CarDetails;