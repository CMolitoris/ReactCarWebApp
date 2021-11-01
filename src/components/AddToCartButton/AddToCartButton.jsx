import React from 'react';
import Button from 'react-bootstrap/Button'


function AddToCartButton(props) {

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
            disabled={props.userID ? false : true}
        >
            <i className="bi bi-cart-plus-fill p-2 fs-5"></i>
            {props.userID === null ? "Please Login" : "Add to Cart"}
        </Button>
    );
}

export default AddToCartButton;