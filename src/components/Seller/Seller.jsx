import React, { Component } from 'react';
import PostCar from '../PostCar/PostCar';


class Seller extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isSeller: null
         }
    }

    render() { 
        return ( 
            <div className='row' id='main-panel'>
                <PostCar nextCarId={this.props.nextCarId} addToSellerConnection={this.props.addToSellerConnection} user={this.props.user} />
            </div>
         );
    }
}
 
export default Seller;