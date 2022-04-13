import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
    return (
        <div className = "navigation">
            <div className="company-name"><h1>All About Paws</h1></div>
            <div className="navigation-menu">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/auth">Account</Link>
                    </li>
                    <li>
                        <Link to="/schedule">Schedule</Link>
                    </li>
                    <li>
                        <Link to="/account">Login/Signup</Link>
                    </li>
                    <li>
                        <Link to="/pets">Add Pet</Link>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default Header;