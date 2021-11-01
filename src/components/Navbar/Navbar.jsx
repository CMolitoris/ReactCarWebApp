import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";


const NavBar = (props) => {


    return ( 
        <nav>
            <ul className='nav justify-content-center offset-lg-4'>
                <li className='nav-item'><Link to  = '/' className='nav-link'><i className="bi bi-house"></i> | Home</Link></li>
                {!props.user && 
                    <React.Fragment>
                        <li >
                            <a className='nav-link' onClick = {props.toggleLogModal}><i className="bi bi-door-closed"></i> | Log In</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' onClick = {props.toggleRegModal}><i className="bi bi-person-check"></i> | Register</a>
                        </li>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-link'><i className="bi bi-truck"></i> | Products </Link>
                        </li>
                    </React.Fragment>
                }
                {props.user && 
                    <React.Fragment>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-link'><i className="bi bi-truck"></i> | Products </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/account' className='nav-link'><i className="bi bi-person"></i> | Account</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/seller' className="nav-link"><i className="bi bi-currency-dollar"></i> | Sellers</Link>
                        </li>   
                        <li className='nav-item'>
                            <Link to='/cart' className='nav-link'><i className="bi bi-cart4">
                                {props.carsInCart > 0
                                    ? <Badge id='form-button-style'>{props.carsInCart}</Badge>
                                    : null
                                }
                                </i> | Cart
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <a onClick = {props.logoutUser} className='nav-link'><i className="bi bi-door-open"></i> | Log Out</a>
                        </li>
                    </React.Fragment>
                }
            </ul>
        </nav>
     );
}
 
export default NavBar;