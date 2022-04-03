import React, { Component } from 'react';
import '../stylesheets/header.css';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='header'>
            <div className='header-left'>
            <p><Link to="/Dashboard">All About Paws</Link></p>
            </div>
            <div className='header-right'>
                <p><Link to="/Login">Login</Link></p>
                <p><Link to="/Register">Sign Up</Link></p>
            </div>
        </div>
    );
}