import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Header.css';
import Account from './Account';

function Header() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                </ul>
                <Routes>
                    {/* <Route exact path="/home" element={<Home />}/> */}
                    <Route exact path="/account"element={<Account />}/>
                    {/* <Route path="*" element={<Home />}/> */}
                </Routes >
            </div >
        </Router >
    )
}

export default Header;