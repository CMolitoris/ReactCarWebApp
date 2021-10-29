import React from 'react';
import { Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import RatingForm from '../RatingForm/RatingForm';
import Reviews from '../Reviews/Reviews'


function RatingSection(props) {

    return ( 
        <div className = "ratingSection">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <h6 className="fw-bold">Reviews</h6>
                    </Accordion.Header>
                    <Accordion.Body>
                            {/*//? Will display the review form if the user is logged in. */}
                            {props.user &&
                                <RatingForm 
                                    postRating={props.postRating} 
                                    carID={props.carID} 
                                    username={props.username} 
                                />
                            }
                            <Card>
                                <Reviews 
                                    ratings={props.ratings} 
                                    username={props.username} 
                                    hasReviews={props.ratings.length > 0}
                                />
                            </Card>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default RatingSection;