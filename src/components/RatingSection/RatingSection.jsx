import React from 'react';
import { Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import RatingForm from '../RatingForm/RatingForm';
import Reviews from '../Reviews/Reviews'

function RatingSection(props) {
    return ( 

        <div className = "ratingSection">
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        <h6 className="text-white"> Reviews </h6>
                    </Accordion.Header>
                    <Accordion.Body>
                            <RatingForm postRating={props.postRating} carID={props.carID} />
                            <Card>
                                <Reviews  />
                            </Card>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
export default RatingSection;