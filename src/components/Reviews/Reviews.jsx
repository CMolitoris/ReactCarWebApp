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
                                    <Card border="light">
                                        <Card.Header className="text-start p-2">
                                        <div className="row row-cols-auto fs-5">
                                            <div className="col">
                                                <i className="bi bi-person-circle p-2"></i>
                                                Username
                                            </div>
                                            <div className="col">
                                                <CustomerReviewRating ratingScore={review.ratingScore} />
                                            </div>
                                        </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <p className="d-flex justify-content-start">
                                                
                                                {review.message}
                                            </p>    
                                        </Card.Body>
                                    </Card>
                                </ListGroupItem>
                    })}
                </ListGroup>
            </div>
        </div>
     );
}
export default Reviews;