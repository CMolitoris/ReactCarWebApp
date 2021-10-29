import React from 'react';
import Button from 'react-bootstrap/Button'

function AddToCartButton(props) {
    return ( 
        <Button 
            className="form-control" 
            onClick={() => props.addToCart({
                UserId: props.userID,
                CarId: props.carID,
                Quantity: 1
            })} 
            variant="primary"
        >
            <i class="bi bi-cart-plus-fill p-2"></i>
            Add to Cart
        </Button>
     );
}

export default AddToCartButton;