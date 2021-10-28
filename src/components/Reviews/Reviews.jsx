import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import RatingForm from '../RatingForm/RatingForm';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


function Reviews (props) {

    const [ReviewRating, setReviewRating] = useState();
    

    return ( 
        <div className = "row">
            <div className = "col-md-12">
        <ListGroup>
            {props.videoComments.map((comment) => {
                return   <ListGroupItem className="bg-primary text-white">
                            <div className="d-flex flex-row justify-content-between">
                                <div className = "d-flex flex-row justify-content-between">
                                    <p>
                                        <button className="btn" onClick={() => props.likeComment(`thumbs_up`, comment.id)}>
                                            <span className="material-icons text-success">thumb_up</span>
                                        </button>
                                        {comment.likes}
                                    </p>
                                    
                                    <p>
                                        <button className="btn" onClick={() => props.likeComment(`thumbs_down`, comment.id)}>
                                            <span className="material-icons text-danger">thumb_down</span>
                                        </button>
                                        {comment.dislikes}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Card>
                                        <Card.Body>
                                            <p className="d-flex justify-content-start">
                                                <span class="material-icons px-3">person</span>
                                                {comment.message}
                                            </p>    
                                        </Card.Body>
                                </Card>
                            </div>
                            <div>
                                <Accordion>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            <p className="text-white">
                                                <span className="comment-photo material-icons">reply</span>
                                                    Replies 
                                            </p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <CommentForm  buttonText = "Reply" videoId = {props.videoId} postComment = {props.postReply} commentId={comment.id}/>
                                            {props.replies.filter(reply => reply.comment === comment.id)
                                                .map((reply) => (
                                                    <p className="d-flex justify-content-start p-3">
                                                        <span className="comment-photo material-icons px-3">person</span>
                                                        {reply.message}
                                                    </p> 
                                                ))
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <br />
                            <hr />
                        </ListGroupItem>
                    })}
                </ListGroup>
            </div>
        </div>
     );
}

export default Reviews;