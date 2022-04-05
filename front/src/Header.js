import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Header.css';
import Account from './Account';

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
            </ul>
        </div >
    )
}

export default Header;