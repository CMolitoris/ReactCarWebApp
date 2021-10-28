import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


function Reviews (props) {

    return ( 
        <div className = "row">
            <div className = "col-md-12">
                <ListGroup>
                    {props.ratings.map((review) => {
                        return   <ListGroupItem className="bg-primary text-black">
                                    <div>
                                        <Card>
                                            <Card.Body>
                                                <p className="d-flex justify-content-start">
                                                    <span class="material-icons px-3">person</span>
                                                    {review.message}
                                                </p>    
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </ListGroupItem>
                    })}
                </ListGroup>
            </div>
        </div>
     );
}

export default Reviews;