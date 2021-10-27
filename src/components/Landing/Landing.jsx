import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }


    render() { 
        return ( 
            <div className='container mx-auto my-auto overflow-hidden' id="main-panel">
                <div className='row'>
                    <div className='col h3'>
                        Store Name
                    </div>
                </div>
                <div className='row'>
                    <div className='col carousel align-items-center'>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src='staticImages\Ford_Shelby.jpg'
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="staticImages\Dodge_Hellcat.jpg"
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="staticImages\Nissan_GTR.jpg"
                                alt="First slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-end me-5'>
                        Store Copyright
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Landing;