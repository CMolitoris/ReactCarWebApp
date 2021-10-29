import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CustomerReviewRating from '../CustomerReviewRating/CustomerReviewRating';


function Reviews (props) {

    return ( 
        <div className = "row">
            <div className = "col-md-12">
                <h5 className="text-start p-2">See what others have to say!</h5>
                <ListGroup>
                    {props.ratings.map((review) => {
                        return   <ListGroupItem>
                                    <div>
                                        <Card border="light">
                                            <Card.Header className="text-start p-2">
                                                <h5>
                                                    <i className="bi bi-person-circle p-2"></i>
                                                    Username 
                                                    <CustomerReviewRating ratingScore={review.ratingScore} />
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <p className="d-flex justify-content-start">
                                                    
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