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
            <div className='mx-auto my-auto row'>
               <Container>
                   
                   <Row>
                       <Col><PostCar sellerFlag={this.props.sellerFlag} postCar={this.props.postCar} nextCarId={this.props.nextCarId} addToSellerConnection={this.props.addToSellerConnection} user={this.props.user} /></Col>
                   </Row>
               </Container>
                
            </div>
         );
    }
}
 
export default Seller;