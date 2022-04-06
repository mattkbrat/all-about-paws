import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/account">Account</Link>
                </li>
                <li>
                    <Link to="/auth">Login/Signup</Link>
                </li>
            </ul>
        </div >
    )
}

export default Header;