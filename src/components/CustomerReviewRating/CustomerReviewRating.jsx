import React from 'react';


function CustomerReviewRating(props) {

    let key = 0
    
    //? Returns an array of strings which will be used to passed into the icon.
    // ? example: <i className={string} /> / <i className="bi bi-star-fill text-dark" />
    const customerRating = function() {
        let stars = []
        for (let i = 0; i < 5; i++) {
            if (i < props.ratingScore){
                stars.push("bi bi-star-fill text-warning")
            }
            else {
                stars.push("bi bi-star-fill text-dark")
            }
        }
        return stars
    }


    return ( 
        <>
            {   
                //? Returns stars array and maps string to className for icon.
                customerRating(props.ratings).map((star) =>{
                    return <i key={`customerReview${key += 1}`} className={star}></i>
                })
            }
        </>
     );
}

export default CustomerReviewRating;