// Display Name: Footer
// Component ID: Footer
// Component Description: Footer component
// Component Version: 1.0.0

// Import
import {useContext, useEffect} from 'react';
import './Header.css';
import {SupabaseContext} from "../SupabaseContext";

export default function Footer(){

    const {
        error,
    } = useContext(SupabaseContext);

    useEffect(
        () => {
            if(error){
                console.log(error);
            }
        },
        [error]
    )

    return(
        <div className = "navigation">
            <h3>{error}</h3>
        </div>
    )
}