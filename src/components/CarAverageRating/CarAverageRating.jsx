import React from 'react';
import Card from 'react-bootstrap/Card';


function CarAverageRating(props) {

    let key = 0

    //? Returns an array of strings which will be used to passed into the icon.
    // ? example: <i className={string} /> / <i className="bi bi-star-fill text-dark" />
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
            {   
                //? Returns stars array and maps string to className for icon.
                averageRating(props.ratings).map((star) =>{
                    return <i key={`carAvgRating${key += 1}`} className={star}></i>
                })
            }
            <br />
            ({props.ratings.length} reviews)
        </Card.Text>
     );
}

export default CarAverageRating;