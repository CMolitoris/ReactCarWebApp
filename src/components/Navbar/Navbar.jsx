import React from 'react';
import { Link } from "react-router-dom";


const NavBar = (props) => {
    return ( 
        <nav>
            <ul className='nav justify-content-end'>
                <li className='nav-item'><Link to  = '/' className='nav-link'>Home</Link></li>
                {!props.user && 
                    <React.Fragment>
                        <li >
                            <Link to='/login' className='nav-link' onClick = {props.toggleModal}>Log In</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/register'  className='nav-link' onClick = {props.toggleModal}>Register</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-link'> Products </Link>
                        </li>
                    </React.Fragment>
                }
                {props.user && 
                    <React.Fragment>
                        <li className='nav-item'>
                            <Link to='/account' className='nav-link'>Account</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/cart' className='nav-link'>Cart</Link>
                        </li>
                        <li className='nav-item'>
                            <a onClick = {props.logoutUser} className='nav-link'>Log Out</a>
                        </li>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-link'> Products </Link>
                        </li>
                    </React.Fragment>
                }
            </ul>
        </nav>
     );
}
 
export default NavBar;