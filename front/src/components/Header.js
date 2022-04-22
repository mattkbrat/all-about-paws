import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import {supabase} from "../client";
import PawCircle from "../components/images/PawCircle.png";


function Header() {

    return (
        <div className = "navigation">
            <div className="company-name" style={{display:"flex", alignItems:"center"}}>
                <img style={{maxHeight:"50px", margin:"1em"}} src={PawCircle} alt="paw-circle" className="paw-circle"/>
                <h1>All About Paws</h1>
            </div>
            {supabase.auth.session() ? (
                <nav className="navigation-menu">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/pets">Add Pet</Link></li>
                        <li><Link to="/schedule">Schedule</Link></li>
                        <li><Link to="/account">Account</Link></li>

                        {/*<div className="navbar">*/}
                        {/*    /!*<a href="#home">Home</a>*!/*/}
                        {/*    /!*<a href="#news">News</a>*!/*/}
                        {/*    /!*<div className="dropdown">*!/*/}
                        {/*    /!*    <button className="dropbtn">Dropdown*!/*/}
                        {/*    /!*        <i className="fa fa-caret-down"></i>*!/*/}
                        {/*    /!*    </button>*!/*/}
                        {/*    /!*    <div className="dropdown-content">*!/*/}
                        {/*    /!*        <Link to="/logout">Logout</Link>*!/*/}
                        {/*    /!*        <Link to="/password-reset">Reset Password</Link>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*</div>*/}

                    </ul>
                </nav>
            ) : (
                <nav className="navigation-menu">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/auth">Login</Link></li>
                        {/*<li><Link to="password-reset">Reset Password</Link></li>*/}
                    </ul>
                </nav>
            )}

            {/*<div className="navigation-menu">*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link to="/home">Home</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/auth">Account</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/schedule">Schedule</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/account">Login/Signup</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/pets">Add Pet</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/logout">Log out</Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div >
    )
}

export default Header;