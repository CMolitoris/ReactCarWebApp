import React from 'react';
import CreateRating from '../CreateRating/CreateRating';


function CarDetails(props) {
    return ( 
        <div className="row">
            <div className="col-sm-3 bg-danger">
                {props}
            </div>
            <div className="col-sm-9">
                
            </div>
        </div>
     );
}

export default CarDetails;