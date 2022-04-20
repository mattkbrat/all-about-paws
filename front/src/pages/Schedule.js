import { Scheduler } from "@aldabil/react-scheduler";


// Function to aid in test data creation - TODO Remove this
function getDate(startDate, addDay) {
    var today = new Date(startDate);
    if (addDay > 0) {
        today.setDate(today.getDate() + addDay);
    }
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var dateStr = yyyy + ' ' + mm + ' ' + dd;
    // console.log(dateStr);
    
    return dateStr;
}

// Function to get events
async function getEvents(query) {
    // get the query start and end date for the page being displayed
    // ?start=Mon Apr 11 2022 00:00:00 GMT-0600 (Mountain Daylight Time)&end=Sat Apr 16 2022 23:59:59 GMT-0600 (Mountain Daylight Time) 
    var params = new URLSearchParams(query);
    var startDate = new Date(params.get('start'));
    var endDate = new Date(params.get('end'));
    //console.log("Start: ", startDate);
    //console.log("End: ", endDate);
    // TODO - Change below to return real data from database

    // simulate work being done - TODO Remove this
    await new Promise(r => setTimeout(r, 2000));

    // User appointments can be protected from other users by setting the
    // 'disabled: true' Attribute.
    // You could also change the event title to a generic 'unavailable' 
    // or something similar if desired.

    return [
        {
            event_id: 1,
            title: "Unavailable - Event 1",
            start: new Date(getDate(startDate, 0) + " 11:00"),
            end: new Date(getDate(startDate, 0) + " 12:00"),
            pet_id: 1,
            disabled: true
        },
        {
            event_id: 2,
            title: "Unavailable - Event 2",
            start: new Date(getDate(startDate, 0) + " 16:00"),
            end: new Date(getDate(startDate, 0) + " 17:00"),
            pet_id: 2,
            disabled: true
        },
        {
            event_id: 3,
            title: "Unavailable - Event 3",
            start: new Date(getDate(startDate, 1) + " 09:00"),
            end: new Date(getDate(startDate, 1) + " 10:00"),
            pet_id: 1,
            disabled: true
        },
        {
            event_id: 4,
            title: "Event 4",
            start: new Date(getDate(startDate, 1) + " 12:00"),
            end: new Date(getDate(startDate, 1) + " 14:00"),
            pet_id: 1,
            disabled: false
        },
        {
            event_id: 5,
            title: "Unavailable - Event 5",
            start: new Date(getDate(startDate, 2) + " 10:00"),
            end: new Date(getDate(startDate, 2) + " 11:00"),
            pet_id: 2,
            disabled: true
        },
        {
            event_id: 6,
            title: "Unavailable - Event 6",
            start: new Date(getDate(startDate, 3) + " 15:00"),
            end: new Date(getDate(startDate, 3) + " 16:00"),
            pet_id: 6,
            disabled: true
        }
    ];
}

/**
 * Get the event data that falls within the date range in the query string 
 * @param {*} query the query string
 * @returns 
 */
const fetchRemote = async (query) => {
    /** Simulate fetchin remote data */
    return new Promise((res) => {
        res(getEvents(query));
    });
};

/**
 * Handle the add/edit event
 * @param {*} event The event to add or change
 * @param {*} action Action being performed (add or edit)
 * @returns 
 */
const handleConfirm = async (event, action) => {
    // console.log(event, action);
    if (action === "edit") {
        // TODO - PUT event to remote DB
    } else if (action === "create") {
        // TODO - POST event to remote DB
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
        res({
            ...event,
            event_id: event.event_id || Math.random()
        });
    });
};

/**
 * Handle the deletion of an event
 * @param {*} deletedId the id of the event to delete
 * @returns ?
 */
const handleDelete = async (deletedId) => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
        // TODO - DELETE event to remote DB
        res(deletedId);
    });
};

/**
 * Handles a drag and drop event
 * @param {*} droppedOn Date
 * @param {*} updatedEvent ProcessedEvent
 * @param {*} originalEvent ProcessedEvent
 * @returns 
 */
const handleTimeChange = async (droppedOn, updatedEvent, originalEvent) => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
        // console.log("droppedOn: " + droppedOn);
        // console.log("updatedEvent: " + JSON.stringify(updatedEvent, null, 2));
        // console.log("originalEvent: " + JSON.stringify(originalEvent, null, 2));
        handleConfirm(updatedEvent, 'edit');
        res({
            ...updatedEvent,
            event_id: updatedEvent.event_id || Math.random()
        });
    });
};

// Create the Scheduler obect
// https://github.com/aldabil21/react-scheduler
export default function Schedule() {
    return (
        <Scheduler
            view="week"
            remoteEvents={fetchRemote}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
            onEventDrop={handleTimeChange}
            week={{
                weekDays: [0, 1, 2, 3, 4, 5],
                weekStartOn: 1,
                startHour: 9,
                endHour: 17,
                step: 60,
            }}
            fields={[
                {
                    name: "pet_id",
                    type: "select",
                    // Should provide options with type:"select"
                    options: [
                        { id: 1, text: "Fido", value: 1 },
                        { id: 2, text: "JT", value: 2 }
                    ],
                    config: {
                        label: "Select Pet",
                        required: true,
                        errMsg: "Please Select Pet" }
                },
                {
                    name: "notes",
                    type: "input",
                    default: "",
                    config: { label: "Notes", multiline: true, rows: 4 }
                },
            ]}
        />
  );
}
