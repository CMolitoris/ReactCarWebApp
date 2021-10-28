import React, { Component } from 'react';
import axios from 'axios';

class PhotoUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedFile: null
         }
    }

    fileSelecterHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            Name: event.target.files[0].name,
            Size: event.target.files[0].size,
            ImageData: event.target.files[0],
            CarId: this.props.carId
        })
    }

    fileUploadHandler = async () => {
        await axios.post(`https://localhost:44394/api/sellerphotos/all/`,this.state)
            .then(res => {
                console.log(res);
            })
    }

    render() { 
        return ( 
            <React.Fragment>
                <input type="file" onChange={this.fileSelecterHandler}/>
            </React.Fragment>
         );
    }
}
 
export default PhotoUpload;