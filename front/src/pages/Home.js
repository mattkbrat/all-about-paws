import React, {useContext, useEffect} from 'react';
import '../components/Header.css';
import '../components/Home.css'
import {supabase} from "../client";
import { SupabaseContext } from "../SupabaseContext";


function Home() {
    const { loading, appointments, client, fetchClientAppointments, fetchClient} = useContext(SupabaseContext);

    useEffect(() => {
        supabase.auth.user() !== null && fetchClientAppointments() && fetchClient();
        console.log(supabase.auth.user())
        console.log("Appointments: ", appointments)
        console.log("Client: " + client)

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
                        <h1>Welcome. Please contact All About Paws to inquire about set appointments.</h1>
                    </div>
                        <div>
                            {supabase.auth.session() && appointments.length ? <>
                            <div>
                                <table className="table">
                                    <caption>Your Appointments</caption>
                                    <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Start</th>
                                        <th scope="col">End</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {appointments.map(appointment => (
                                        <tr key={appointment.event_id}>
                                            <td>{appointment.event_id.split('-')[4]}</td>
                                            <td>{String(appointment.start)}</td>
                                            <td>{String(appointment.end)}</td>
                                            <td>{appointment.status == 1 ? "Confirmed" : "Pending"}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                        </>
                            : <h1>You have no appointments</h1>}
                        </div>
                    </div>}
            </div>
        </div>
    );
}

export default Home;