import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Validator Packages
import SimpleReactValidator from "simple-react-validator";
import { createTheater } from "./Service";
import { Error } from "../../helpers/Error";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  // set state
  const [state, setState] = useState({
    title:"",
    slug:"",
    status:true,
    seat_capacity:"",
    no_of_rows:"",
    seats_in_each_row:"",
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
      createTheater(state)
        .then((data) => {
          navigate("/theater");
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
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="Id">
          ID
        </label>
        <div class="col-md-4">
          <input
            id="Id"
            name="Id"
            type="text"
            placeholder=""
            class="form-control input-md"
            required=""
          />
        </div>
      </div>
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
            class="form-control input-md"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="status">
          Status
        </label>
        <div className="col-md-4">
          <label className="radio-inline" htmlFor="status-0">
            <input
              type="radio"
              name="status"
              id="status-0"
              value="1"
              checked="checked"
            />
            Active
          </label>
          <label className="radio-inline" htmlFor="status-1">
            <input type="radio" name="status" id="status-1" value="0" />
            Inactive
          </label>
        </div>
      </div>
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="seat_capacity">
          Seat_capacity
        </label>
        <div class="col-md-4">
          <input
            id="seat_capacity"
            name="seat_capacity"
            type="number"
            placeholder="Enter seat capacity"
            class="form-control input-md"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="no_of_rows">
          No_of_rows
        </label>
        <div class="col-md-4">
          <input
            id="no_of_rows"
            name="no_of_rows"
            type="number"
            placeholder=""
            class="form-control input-md"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="seats_in_each_row">
          Seats_in_each_row
        </label>
        <div className="col-md-4">
          <input
            id="seats_in_each_row"
            name="seats_in_each_row"
            type="number"
            placeholder=""
            class="form-control input-md"
          />
        </div>
      </div>
    </>
  );
};



export default Create;
