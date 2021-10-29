import React from 'react';
import Button from 'react-bootstrap/Button'

function AddToCartButton(props) {

    //? Function that enables/disables the button if a user is logged in.
    const isDisabled = function(userID) {
        if (userID === null){
            return true
        }
        else{
            return false
        }
    }

    return ( 
        <Button
            id="form-button-style"  
            className="form-control" 
            onClick={() => props.addToCart({
                UserId: props.userID,
                CarId: props.carID,
                Quantity: 1
            })} 
            variant="primary"
            disabled={isDisabled(props.userID)}
        >
            <i class="bi bi-cart-plus-fill p-2 fs-5"></i>
            {props.userID === null ? "Please Login" : "Add to Cart" }
        </Button>
     );
}
export default AddToCartButton;