import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import FormReservation from "./FormReservation";

function CreateReservation() {
  const [createError, setCreateError] = useState(null);
  const history = useHistory();

  async function submitHandler(reservation) {
    reservation.mobile_number = reservation.mobile_number.replace(
      /[^0-9.]/g,
      ""
    );
    reservation.people = Number(reservation.people);
    const ac = new AbortController();
    await createReservation(reservation, ac.signal)
      .then(() =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setCreateError);
    return () => ac.abort();
  }

  return (
    <div>
      <h1>Create a new reservation</h1>
      <ErrorAlert error={createError} />
      <FormReservation submitHandler={submitHandler} />
    </div>
  );
}

export default CreateReservation;
