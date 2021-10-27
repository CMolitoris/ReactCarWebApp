import React from 'react';
import { Link } from "react-router-dom";


const NavBar = (props) => {
    return ( 
        <nav>
            <ul>
                <li><Link to  = '/'>Home</Link></li>
                {!props.user && 
                    <React.Fragment>
                        <li>
                            <Link to='/login' onClick = {props.toggleModal}>Log In | </Link>
                        </li>
                        <li>
                            <Link to='/register' onClick = {props.toggleModal}>Register</Link>
                        </li>
                    </React.Fragment>
                }
                {props.user && 
                    <React.Fragment>
                        <li>
                            <Link to='/account'>Account | </Link>
                        </li>
                        <li>
                            <Link to='/cart'>Cart | </Link>
                        </li>
                        <li>
                            <a onClick = {props.logoutUser}>Log Out</a>
                        </li>
                    </React.Fragment>
                }
            </ul>
        </nav>
     );
}
 
export default NavBar;