/*
Log user out
 */

import { Navigate } from "react-router-dom";
import {useContext, useEffect} from "react";
import { SupabaseContext } from "../../SupabaseContext";

export default function Logout() {
    let shouldRedirect = false;
    const { loading, logOut} = useContext(SupabaseContext);

    const handleSubmit = async () => {
        await logOut();
        shouldRedirect = true
    }

    useEffect(() => {
        if (shouldRedirect) {
            Navigate("/");
        }
    }, [shouldRedirect]);


    // Return the logout page
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Logging out...</h1>
                    <script>
                        {
                            loading ?
                                <div>Loading...</div>
                                :
                                <button onClick={handleSubmit}>Logout</button>
                        }
                    </script>
                </div>
            </div>
        </div>
    );
}

