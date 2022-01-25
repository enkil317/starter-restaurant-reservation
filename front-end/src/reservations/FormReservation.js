import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function FormReservation({ setReservation, submitHandler, reservation }) {
  const initialFormState = {
    "first_name": "",
    "last_name": "",
    "mobile_number": "",
    "reservation_date": "",
    "reservation_time": "",
    "people": 0
  }
  const [formData, setFormData] = useState(...initialFormState); 
  const history = useHistory();
 
  function changeHandler({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value, 
    })
  }

  const cancelHandler = () => {
    history.push("/");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="d-flex text-center flex-wrap justify-content-center">
            <div className="col-12">
                <h2>Please Enter Reservation Information</h2>
            </div>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="col-md-6 my-1 mx-1"
              placeholder="First Name"
              require="true"
              value={formData.first_name}
              onChange={changeHandler}
            />
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="col-md-6 my-1 mx-1"
              placeholder="Last Name"
              require="true"
              value={formData.last_name}
              onChange={changeHandler}
            />

            <input
              type="text"
              id="mobile_number"
              name="mobile_number"
              className="col-md-6 my-1 mx-1"
              placeholder="Mobile Number"
              require="true"
              value={formData.mobile_number}
              onChange={changeHandler}
            />
            <input
              type="number"
              id="people"
              name="people"
              className="col-md-6 my-1 mx-1"
              placeholder="Number Of People In Party"
              require="true"
              value={formData.people}
              onChange={changeHandler}
            />

            <input
              type="date"
              id="reservation_date"
              name="reservation_date"
              className="col-md-6 my-1 mx-1"
              require="true"
              value={formData.reservation_date}
              onChange={changeHandler}
            />
            <input
              type="time"
              id="reservation_time"
              name="reservation_time"
              className="col-md-6 my-1 mx-1"
              require="true"
              value={formData.reservation_time}
              onChange={changeHandler}
            />
          </div>

          <div className="row justify-content-around">
            <button
              type="submit"
              className="btn btn-secondary my-2 col-5"
              onClick={submitHandler}
            >
              Submit
            </button>

            <button
              type="cancel"
              className="btn btn-secondary  my-2 text-light col-5"
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default FormReservation;