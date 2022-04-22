import {useContext, useEffect} from "react";
import {SupabaseContext} from "../SupabaseContext";

import { Scheduler } from "@aldabil/react-scheduler";
import { supabase } from "../client";

/**
 * this code handles new calendar events
 * @param {*} event object that contains event details
 * @param {*} action action to perform create/edit
 * @returns
 */
// const handleConfirm = async (event, action) => {
//     console.log(event, action);
//
//     if (action === "edit") {
//         try{
//             await updateAppointment(event);
//         } catch (error) {
//             throw error;
//         } finally {
//             console.log("updateAppointment");
//         }
//     } else if (action === "create") {
//         /** TODO - POST event to remote DB */
//     }
//     /**
//      * Make sure to return 4 mandatory fields:
//      * event_id: string|number
//      * title: string
//      * start: Date|string
//      * end: Date|string
//      * ....extra other fields depend on your custom fields/editor properties
//      */
//     // Simulate http request: return added/edited event
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res({
//                 ...event,
//                 event_id: event.event_id || Math.random()
//             });
//         }, 3000);
//     });
// };
/**
 *  this code handles deleting calander events
 * @param {*} deletedId eventID to delete
 * @returns
 */
const handleDelete = async (appointment) => {

};

// https://github.com/aldabil21/react-scheduler
export default function Schedule() {

    const {
        fetchAppointments, appointments, loading,
        adding, updateAppointment, pets, fetchPets}= useContext(SupabaseContext);

    useEffect(() => {
        supabase.auth.user() !== null && fetchAppointments() && fetchPets();
        console.log("Appointments: ", appointments);
        console.log("User: ", supabase.auth.user());
        console.log("Pets: ", pets);
    }, []);


    return (
        <div>
            {loading || adding ? (
                "Loading..."
            ) : (
                <div>
                    <p>Found {appointments.length} appointments.</p>
                    <Scheduler
                        view="week"
                        events={appointments}
                        onConfirm={updateAppointment}
                        onDelete={handleDelete}
                        week={{
                            weekDays: [0, 2, 3, 4, 5],
                            weekStartOn: 1,
                            startHour: 7,
                            endHour: 15,
                            step: 60,
                        }}
                        fields={[
                            {
                                name: "pet_id",
                                type: "select",
                                // Should provide options with type:"select"
                                options: pets.map(pet => ({
                                    value: pet.id,
                                    text: pet.name + " (" + pet.profiles.last_name + ")"
                                })),
                                config: {label: "Pet Name", required: true, errMsg: "Please Select Pet"}
                            },
                            {
                                name: "notes",
                                type: "input",
                                default: appointments.special_instructions,
                                config: {label: "notes", multiline: true, rows: 2}
                            },
                            // Status
                            {
                                name: "status",
                                type: "select",
                                default: 2,
                                options: [
                                    {id: 1, text: "Pending", value: 1},
                                    {id: 2, text: "Confirmed", value: 2},
                                    {id: 3, text: "Cancelled", value: 3}
                                ],
                                config: {label: "status", required: true, errMsg: "Please Select Status"}
                            },
                        ]}
                        viewerExtraComponent={(fields, event) => (
                            <div>
                                {/*// Display more info about the event*/}
                                <div>
                                    <p>Special Instructions:</p>
                                    <p>{event.special_instructions}</p>
                                    {/*<p>{updateData.item.status}</p>*/}
                                </div>
                            </div>
                        )}
                    />
                </div>
            )}
        </div>
    );
}