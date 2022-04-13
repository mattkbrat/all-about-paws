// Logout page

// Imports
import React, { Component } from 'react';
import {supabase} from "../client";
import {useNavigate} from "react-router-dom";


// Sign user out
const SignOut = async () => {
    const {error} = await supabase.auth.signOut();

    return (
        <div>
            <h1>You have been signed out</h1>
            <p>You will be redirected to the home page</p>
            <p>If you are not redirected, please click <a href="/">here</a></p>
            <script>
                setTimeout(function () {
                <useNavigate to="/"/>
                }, 3000);
            </script>  // Redirect to home page after 3 seconds
        </div>
    );
}

export default SignOut;