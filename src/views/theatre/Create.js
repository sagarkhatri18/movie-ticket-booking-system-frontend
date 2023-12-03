import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Validator Packages
import SimpleReactValidator from "simple-react-validator";
import { createTheatre } from "./Service";
import { Error } from "../../helpers/Error";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  // set state
  const [state, setState] = useState({
    title: "",
    status: "",
    seat_capacity: "",
    no_of_rows: "",
    seats_in_each_row: "",
  });

  const [error, setError] = useState("");

  // Validator Imports
  const validator = useRef(new SimpleReactValidator()).current;
  const [, forceUpdate] = useState();

  // handle input fields onchange value
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validator.allValid()) {
      createTheatre(state)
        .then((data) => {
          navigate("/theatre");
          toast.success(data.data.message);
        })
        .catch((error) => {
          setError(error.response.data);
          toast.error("Error occured while sending data");
        });
    } else {
      validator.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <>
      <div className="row">
        <Error errors={error} />
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="col-12">
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="title">
                  Title
                </label>
                <div className="col-md-4">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Audi 1, Audi 2"
                    onChange={handleChange}
                    className="form-control input-md"
                  />
                  {validator.message("theatre title", state.title, "required")}
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4" htmlFor="status">
                  Status
                </label>
                <div className="col-md-4">
                  <label className="radio-inline" htmlFor="status">
                    <input
                      type="radio"
                      name="status"
                      id="status-0"
                      value="1"
                      checked="checked"
                      onChange={handleChange}
                    />
                    Active
                  </label>
                  <label className="radio-inline" htmlFor="status">
                    <input
                      type="radio"
                      name="status"
                      id="status-1"
                      value="0"
                      onChange={handleChange}
                    />
                    Inactive
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  htmlFor="seat_capacity"
                >
                  Seat Capacity
                </label>
                <div className="col-md-4">
                  <input
                    id="seat_capacity"
                    name="seat_capacity"
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter theatre's seat capacity"
                    className="form-control input-md"
                  />
                  {validator.message(
                    "theatre seat capacity",
                    state.seat_capacity,
                    "required"
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="no_of_rows">
                  No Of Rows
                </label>
                <div className="col-md-4">
                  <input
                    id="no_of_rows"
                    name="no_of_rows"
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter theatre's number of rows"
                    className="form-control input-md"
                  />
                  {validator.message(
                    "theatre number of rows",
                    state.no_of_rows,
                    "required"
                  )}
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  htmlFor="seats_in_each_row"
                >
                  Seats In Each Row
                </label>
                <div className="col-md-4">
                  <input
                    id="seats_in_each_row"
                    name="seats_in_each_row"
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter theatre's seats in each row"
                    className="form-control input-md"
                  />
                  {validator.message(
                    "theatre seats in each row",
                    state.seats_in_each_row,
                    "required"
                  )}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <button type="submit" className="btn btn-md btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
