import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FormReservation from "../reservations/FormReservation";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservations() {
    const [dataError, setDataError] = useState(null);
    const history = useHistory();


async function submitHandler(reservation) {
    // reservation.mobile_number = reservation.mobile_number.replace(
    //     /[^0-9.]/g,
    
    // );
    reservation.people = Number(reservation.people);
    const ac = new AbortController();
    try {
        await createReservation(reservation, ac.signal)
    history.push(`/dashboard?date=${reservation.reservation_date}`)
    } catch (error) {
        setDataError(error)
    }
    return () => ac.abort;
}

return (
    <div>
        <h1>Create a new reservation</h1>
        <ErrorAlert error={dataError} />
        <FormReservation submitHandler={submitHandler} />
    </div>
)
}


export default CreateReservations;