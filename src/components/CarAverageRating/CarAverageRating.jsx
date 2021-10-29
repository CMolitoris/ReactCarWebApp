import React from 'react';
import Card from 'react-bootstrap/Card';

function CarAverageRating(props) {

    const averageRating = function(ratings) {
        let avg = 0
        let stars = []
        ratings.forEach(rating => avg += rating.ratingScore)
        avg = Math.round(avg / ratings.length)
        for (let i = 0; i < 5; i++) {
            if (i < avg){
                stars.push("bi bi-star-fill text-warning")
            }
            else {
                stars.push("bi bi-star-fill text-dark")
            }
        }
        return stars
    }

    
    return ( 
          <Card.Text>
                {/*//? Car Average Rating */}
                    <h5>Average Rating:</h5>
                    {
                        averageRating(props.ratings).map((star) =>{
                            return <i class={star}></i>
                        })
                    }
                    <p>({props.ratings.length} reviews)</p>
            </Card.Text>
     );
}
export default CarAverageRating;