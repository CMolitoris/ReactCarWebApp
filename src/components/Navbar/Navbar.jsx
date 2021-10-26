import React from 'react'
import { Link } from "react-router-dom"

const NavBar = (props) => {
    return ( 
        <nav>
            <ul>
                {!props.user && 
                    <React.Fragment>
                        <li>
                            <Link to='/login'>Log In | </Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </React.Fragment>
                }
                {props.user && 
                    <React.Fragment>
                        <h1>{props.user.firstName}</h1>
                        {console.log(props.user)}
                        <li>
                            <Link to='/account'>Account | </Link>
                        </li>
                        <li>
                            <Link to='/cart'>Cart | </Link>
                        </li>
                        <li>
                            <Link to='/logout'>Log Out</Link>
                        </li>
                    </React.Fragment>
                }
            </ul>
        </nav>
     );
}
 
export default NavBar;