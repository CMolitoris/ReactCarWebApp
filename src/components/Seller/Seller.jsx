import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import PostCar from '../PostCar/PostCar';


class Seller extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isSeller: null
         }
    }

    // id='main-panel'

    render() { 
        return ( 
            <div className='row'>
                <div className="col"></div>
                    <PostCar getCarData={this.props.getCarData} carData={this.props.carData} user={this.props.user} sellerFlag={this.props.sellerFlag} postCar={this.props.postCar} getNextCarId={this.props.getNextCarId} 
                    addToSellerConnection={this.props.addToSellerConnection} />
                <div className="col"></div>
            </div>
         );
    }
}
 
export default Seller;