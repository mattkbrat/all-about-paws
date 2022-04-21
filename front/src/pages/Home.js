import React, {useContext, useEffect} from 'react';
import '../components/Header.css';
import {supabase} from "../client";
import { SupabaseContext } from "../SupabaseContext";

function Home() {
    const { loading, appointments, fetchClientAppointments} = useContext(SupabaseContext);

    useEffect(() => {
        supabase.auth.user() !== null && fetchClientAppointments();
        console.log(supabase.auth.user())

    }, []);


    return (

        <div className="container">
            <div className='body'>
                { loading ?
                    <div>
                        <h1>Loading...</h1>
                    </div>
                    :
                    <div>
                    <div>
                        Welcome Home{
                            supabase.auth.session() && appointments.length ?
                                <>
                                    , {appointments[0].first_name}.
                                    <div>
                                        <h1>Your Appointments</h1>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {appointments.map(appointment => (
                                                <tr key={appointment.id}>
                                                    <td>{String(appointment.start)}</td>
                                                    <td>{appointment.status}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </>
                                : <p>

                                </p>
                        }
                    </div>

                    </div>
                }
            </div>
        </div>
    );
}

export default Home;