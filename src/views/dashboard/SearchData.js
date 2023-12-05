import React from "react";
import { NavLink } from "react-router-dom";
import Rating from "react-rating";

const SearchData = (props) => {
  const movies = props.data;
  return movies.map((movie) => {
    return (
      <div className="col-sm-3" key={movie._id}>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <p>{movie.title} - {movie.theatre_id.title}</p>
              <span><Rating
                stop={5}
                readonly
                placeholderRating={movie.rating}
                emptySymbol={[
                  "fa fa-star-o fa-2x low",
                  "fa fa-star-o fa-2x low",
                  "fa fa-star-o fa-2x medium",
                  "fa fa-star-o fa-2x medium",
                  "fa fa-star-o fa-2x high",
                  "fa fa-star-o fa-2x high",
                ]}
                placeholderSymbol={[
                  "fa fa-star fa-2x low",
                  "fa fa-star fa-2x low",
                  "fa fa-star fa-2x medium",
                  "fa fa-star fa-2x medium",
                  "fa fa-star fa-2x high",
                  "fa fa-star fa-2x high",
                ]}
              /></span>
            </h5>
            <p className="card-text">
              <span>
                Price: <b>{movie.price}</b>
              </span>
              <br></br>
              <span>
                Currency: <b>{movie.currency}</b>
              </span>
              <br></br>
              <span>
                Price: <b>${movie.price}</b>
              </span>
              <br></br>
              <span>
                Genre: <b>{movie.genre}</b>
              </span>
              <br></br>
              <span>
                Play Time: <b>{movie.play_time}</b>
              </span>
              <br></br>
              <span>
                Release Year: <b>{movie.release_year}</b>
              </span>
              <br></br>
            </p>
            <NavLink to={`/movie/booking/${movie._id}`}>
              <button className="btn btn-primary">
                Book Now <i className="fa fa-arrow-right"></i>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  });
};

export default SearchData;
