import FormReservation from "./FormReservation";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { formatAsDate } from "../utils/date-time";
import { findReservation, editReservation } from "../utils/api";

function Edit() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const ac = new AbortController();
    setReservationsError(null);
    findReservation(reservation_id, ac.signal)
      .then(setReservation)
      .catch(setReservationsError);
    return () => ac.abort();
  }

  async function submitHandler(updatedReservation) {
    updatedReservation.mobile_number = (updatedReservation.mobile_number).replace(/[^0-9.]/g, '')
    updatedReservation.people = Number(updatedReservation.people);
    await editReservation(updatedReservation)
        .then(() => history.push(`/dashboard?date=${updatedReservation.reservation_date}`))
        .catch(setReservationsError)
  }

  if (reservation) {
      reservation.reservation_date = formatAsDate(reservation.reservation_date);
  }

  return (
    <div>
      <h1>Edit reservation</h1>
      <ErrorAlert error={reservationsError} />
      {reservation && <FormReservation submitHandler={submitHandler} initialState={reservation} />}
    </div>
  );
}

export default Edit;
