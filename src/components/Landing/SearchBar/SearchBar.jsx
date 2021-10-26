import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filterInput: '',
            filteredCarList: [],
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value 
        });
        let newCars = this.props.songs.filter(car => {
            if (car.Make.includes(event.target.value)){
                return true;
            }
            else if (car.Model.includes(event.target.value)){
                return true;
            }
            else if (car.Year.includes(event.target.value)){
                return true;
            }
            else if (car.Type.includes(event.target.value)){
                return true;
            }
            else{
                return false;
            }
        }); 
        this.props.filterSearch(newCars)
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.state.filterInput = '';
        this.props.GetAllCars();
    }


    render() { 
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='h4'>
                        Search:
                        <input className='form-control' name='filterInput' type="text" value={this.state.filterInput} onChange={this.handleChange} />
                        <input className='form-control mt-1' name='reset' type='submit' value='Reset Search' />
                    </div>
                </form>
            </div>
        );
    }
}
 
export default SearchBar;