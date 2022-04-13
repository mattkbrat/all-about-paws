import { Scheduler } from "@aldabil/react-scheduler";

// Test date for test events - TODO - remove this with test data
function getDate(addDay) {
    var today = new Date();
    if (addDay) {
        today.setDate(today.getDate() + addDay);
    }
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    var dateStr = yyyy + ' ' + mm + ' ' + dd;
    console.log(dateStr);
    return dateStr;
}
// Test Events - TODO - replace with real events
function getEvents() {
    return [
        {
            event_id: 1,
            title: "Event 1",
            start: new Date(getDate(-1) + " 11:00"),
            end: new Date(getDate(-1) + " 12:00")
        },
        {
            event_id: 2,
            title: "Event 2",
            start: new Date(getDate(-1) + " 16:00"),
            end: new Date(getDate(-1) + " 17:00")
        },
        {
            event_id: 3,
            title: "Event 3",
            start: new Date(getDate() + " 09:00"),
            end: new Date(getDate() + " 10:00")
        },
        {
            event_id: 4,
            title: "Event 4",
            start: new Date(getDate() + " 12:00"),
            end: new Date(getDate() + " 14:00")
        },
        {
            event_id: 5,
            title: "Event 5",
            start: new Date(getDate(+1) + " 10:00"),
            end: new Date(getDate(1) + " 11:00")
        },
        {
            event_id: 6,
            title: "Event 6",
            start: new Date(getDate(1) + " 15:00"),
            end: new Date(getDate(1) + " 16:00")
        }
    ];
}

    

/**
 * this code handles new calander events
 * @param {*} event object that contains event details
 * @param {*} action action to perform create/edit
 * @returns 
 */
const handleConfirm = async (event, action) => {
    console.log(event, action);
    if (action === "edit") {
        /** TODO - PUT event to remote DB */
    } else if (action === "create") {
        /** TODO - POST event to remote DB */
    }
    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({
                ...event,
                event_id: event.event_id || Math.random()
            });
        }, 3000);
    });
};
/**
 *  this code handles deleting calander events
 * @param {*} deletedId eventID to delete
 * @returns 
 */
const handleDelete = async (deletedId) => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(deletedId);
        }, 3000);
    });
};
  
// https://github.com/aldabil21/react-scheduler
export default function Schedule() {
    return (
        <Scheduler
            view="week"
            events={getEvents()}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
            week={{
                weekDays: [0, 1, 2, 3, 4, 5],
                weekStartOn: 1,
                startHour: 9,
                endHour: 17,
                step: 60,
            }}
            fields={[
                {
                    name: "user_id",
                    type: "select",
                    // Should provide options with type:"select"
                    options: [
                        { id: 1, text: "Fido", value: 1 },
                        { id: 2, text: "Jt", value: 2 }
                    ],
                    config: { label: "Pet Name", required: true, errMsg: "Please Select Pet" }
                },
                {
                    name: "Description",
                    type: "input",
                    default: "Default Value...",
                    config: { label: "Details", multiline: true, rows: 4 }
                },
            ]}
        />
  );
}