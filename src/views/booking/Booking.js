import React from "react";
import { NavLink } from "react-router-dom";

const Booking = () => {
  return (
    <>
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="id">
          ID
        </label>
        <div className="col-md-4">
          <input
            id="id"
            name="id"
            type="text"
            placeholder=""
            className="form-control input-md"
            required=""
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="name">
          Name
        </label>
        <div className="col-md-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder=""
            className="form-control input-md"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="email">
          Email
        </label>
        <div className="col-md-4">
          <input
            id="email"
            name="email"
            type="text"
            placeholder=""
            className="form-control input-md"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="phone">
          Phone Number
        </label>
        <div className="col-md-4">
          <input
            id="phone"
            name="phone"
            type="number"
            placeholder=""
            className="form-control input-md"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="quantity">
          Quantity
        </label>
        <div className="col-md-4">
          <input
            id="quantity"
            name="quantity"
            type="number"
            placeholder=""
            className="form-control input-md"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="sub_total">
          Sub Total
        </label>
        <div className="col-md-4">
          <input
            id="sub_total"
            name="sub_total"
            type="number"
            placeholder=""
            className="form-control input-md"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="tax">
          Tax
        </label>
        <div className="col-md-4">
          <input
            id="tax"
            name="tax"
            type="number"
            placeholder=""
            className="form-control input-md"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-4 control-label" for="total">
          Total
        </label>
        <div class="col-md-4">
          <input
            id="total"
            name="total"
            type="number"
            placeholder=""
            className="form-control input-md"
          />
        </div>
      </div>
    </>
  );
};

export default Booking;
