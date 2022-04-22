// Imports
import {createContext, useContext, useState} from 'react';
import { supabase } from "./client";

// Initialize the context
export const SupabaseContext = createContext({});

export function ItemsContextProvider(props) {
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [pets, setPets] = useState([]);
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);


    const [activeItems, setActiveItems] = useState([]);


    const logIn = async (email) => {
        setLoading(true);
        try {
            // Send magic link to user from supabase
            const { error } = await supabase.auth.signIn({ email });
            if (error) throw error; // Throw error if there is one

            alert("Please check your email for a magic login link from supabase!");


        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
        }

    };

    // Reset the session and log the user out
    const logOut = async () => {
        setLoading(true);
        try {
            // Log the user out
            await supabase.auth.signOut();
            alert("You have been logged out!");
        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
            setError("");
        }
    };

    const updateClient = async () => {
        try {
            const user = supabase.auth.user()

            const updates = {
                id: user.id,
                first_name: client.first_name,
                last_name: client.last_name,
                street_address: client.street_address,
                city_address: client.city_address,
                state_address: client.state_address,
                zip_address: client.zip_address,
                phone_no: client.phone_no,
                avatar_url: client.avatar_url,
                updated_at: new Date(),
            };

            let {error} = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            });

            if (error) throw error; // Throw error if there is one
        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
            setError("");
        }
    };

    // Fetch client's name from supabase
    const fetchClient = async () => {
        setLoading(true);
        const client = await supabase.auth.user();

        try {
            // Fetch the client's name

            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', client.id)

            if (error) throw error; // Throw error if there is one

            setClient(profile)
            console.log("Tried to fetch logged in profile. Result: ", profile);

        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
            setError("");
        }
    };

    const appointmentParser = (appointments) => {
        let parsedAppointments = [];
        // Parse the response
        try{
            appointments.map(
                (appointment) => {
                    let { event_id, status, start, end, notes, pets } = appointment;
                    let { owner_id, special_instructions, name, profiles } = pets;
                    let { first_name, last_name } = profiles;
                    parsedAppointments.push({
                        status: status,
                        notes,
                        event_id,
                        start: new Date(start),
                        end: new Date(end),
                        title: last_name + ", " + first_name + " - " + name,
                        owner_id,
                        first_name,
                        last_name,
                        special_instructions
                    });
                }
            )
        } catch (error) {
            console.log(error.message)
            setError("Error parsing appointments, "+error.message);
        } finally {
            setError("")
            return parsedAppointments;
        }
    }

    // Get all appointments from the database
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            // Get all appointments from the database
            let { data: response, error } = await supabase
                .from('appointments')
                .select('event_id, start, end, pet_id, status, notes, ' +
                    'pets:pet_id (owner_id, special_instructions, name, profiles:owner_id (first_name, last_name))')

            if (error) throw error; // Throw error if there is one
            console.log("Tried to fetch appointments. Result: ", response);

            // Set the active appointments
            setAppointments(appointmentParser(response));

            console.log("Tried to fetch appointments. Result: ", response);

        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
            setError("");
        }
    };


    const fetchPets = async () => {
        setLoading(true);
        try {
            // Get all appointments from the database
            let { data: response, error } = await supabase
                .from('pets')
                .select('*, profiles:owner_id (first_name, last_name)')

            if (error) throw error; // Throw error if there is one
            console.log("Tried to fetch pets. Result: ", response);

            // Sort the list by name
            response.sort(function(a, b) {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            // Set the active appointments
            setPets(response);

            console.log("Tried to fetch pets. Result: ", response);

        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
            setError("");
        }
    };


    // Get appointments that the client has made
    const fetchClientAppointments = async () => {
        setLoading(true);
        try {

            const user = supabase.auth.user();

            // Get all appointments from the database
            let { data: response, _ } = await supabase
                .from('appointments')
                .select('event_id, start, status, end, pet_id, ' +
                    'pets (owner_id, special_instructions, name, profiles (first_name, last_name))')
                .eq('pets.owner_id', user.id)

            console.log("Tried to fetch client appointments. Result: ", response);


            // Set the active appointments
            setAppointments(appointmentParser(response));

        } catch (error) {
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
            setError("");
        }
    }

    const updateAppointment = async (event, action) => {

        try {
            setAdding(true);
            console.log("Event: ", event);
            console.log("Action: ", action);

            if (action === "update" || action === "edit") {

                // console.log(update);

                // Update the appointment
                let { data: response, error } = await supabase
                    .from('appointments')
                    .update({
                        updated_at: new Date(),
                        status: event.status,
                        notes: event.notes,
                        end: event.end,
                        start: event.start
                    })
                    .eq('event_id', event.event_id)

                console.log("Tried to update appointment. Result: ", response);

                if (error) throw error; // Throw error if there is one

                // Fetch the appointments again

            } else if (action === "create") {

                const { data, error } = await supabase
                    .from('appointments')
                    .insert({
                        groomer: "f468a036-82aa-44e4-850b-35ff2732b939",
                        pet_id: event.pet_id,
                        notes: event.notes,
                        updated_at: new Date(),
                        status: event.status,
                        end: event.end,
                        start: event.start,
                        client_id: supabase.auth.user().id,
                })

                if (error) throw error; // Throw error if there is one
            }

            /**
             * Make sure to return 4 mandatory fields:
             * event_id: string|number
             * title: string
             * start: Date|string
             * end: Date|string
             * ....extra other fields depend on your custom fields/editor properties
             */

        } catch (error) {
            console.log("Error encountered when updating appointment: ", error);
            setError(error.message);
        } finally {
            setLoading(false);
            await fetchAppointments();
            setError("");
            return event;
        }
    }



    return (
        <SupabaseContext.Provider
            value={{
                loading,
                logIn,
                logOut,
                appointments,
                updateAppointment,
                fetchAppointments,
                client,
                fetchClientAppointments,
                fetchClient,
                updateClient,
                setError,
                error,
                pets,
                fetchPets,
                activeItems,
                adding,
                setAdding,
                setActiveItems,
            }}>
            {props.children}
        </SupabaseContext.Provider>
    )
}

export const useItemsContext = () => {
    const context = useContext(SupabaseContext);
    if (context === undefined) {
        throw new Error('useItemsContext must be used within a ItemsContextProvider');
    }
    return context;
};