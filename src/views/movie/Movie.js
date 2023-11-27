import React from "react";
import { NavLink } from "react-router-dom";

const Movie = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <NavLink to='/movie/create'><button type="button" className="btn btn-sm btn-primary float-right">Add New</button></NavLink>
          <h5>Welcome to the Movie Listing page</h5>
        </div>
      </div>
    </>
  );
};

export default Movie;
