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
                <PostCar addToSellerConnection={this.props.addToSellerConnection} />
            </div>
         );
    }
}
 
export default Seller;