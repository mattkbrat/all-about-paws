import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import {supabase} from "../client";

function Header() {
    return (
        <div className = "navigation">
            <div className="company-name"><h1>All About Paws</h1></div>
            {supabase.auth.session() ? (
                <nav className="navigation-menu">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/pets">Add Pet</Link></li>
                        <li><Link to="/schedule">Schedule</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            ) : (
                <nav className="navigation-menu">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/auth">Login</Link></li>
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