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
                    <Link to="/auth">Account</Link>
                </li>
                <li>
                    <Link to="/account">Login/Signup</Link>
                </li>
                <li>
                    <Link to="/pets">Add Pet</Link>
                </li>
            </ul>
        </div >
    )
}

export default Header;