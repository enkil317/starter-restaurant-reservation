import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

function NewTable() {
    const [table, setTable] = useState({
      table_name: "",
      capacity: "",
    });
  
    const [tableError, setTableError] = useState(null)
  
    function changeHandler({ target: { name, value } }) {
      setTable((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  
    const history = useHistory();
  
    async function handleSubmit(evt) {
      const ac = new AbortController();
        evt.preventDefault();
        evt.stopPropagation();
        table.capacity = Number(table.capacity);
      await createTable(table, ac.signal)
          .then(() => history.push("/dashboard"))
          .catch(setTableError);
  
        return () => ac.abort();
    }
  
    return (
      <div>
        <h1>Create a new table</h1>
        <ErrorAlert error={tableError} />
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="row">
              <div className="form-group col-3">
                <label htmlFor="table_name">Table name</label>
                <input
                  type="text"
                  minLength="2"
                  id="table_name"
                  name="table_name"
                  className="form-control"
                  value={table.table_name}
                  required
                  placeholder="Table name"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group col-2">
                <label htmlFor="capacity">Table capacity</label>
                <input
                  type="number"
                  id="capacity"
                  min="1"
                  name="capacity"
                  className="form-control"
                  value={table.capacity}
                  required
                  placeholder="Table capacity"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <button 
              type="button"
              className="btn btn-secondary mr-2"
              onClick={() => history.goBack()}
              >
                Cancel
            </button>
            <button 
              type="submit" className="btn btn-primary"
            >
                Submit
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
  
  export default NewTable;