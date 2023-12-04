import React, { useState, useEffect, useCallback } from "react";
import { searchMovie } from "./Service";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const MovieSearch = () => {
  // set state
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState(null);

  // search movies on the basis of title
  const loadMovies = async () => {
    if (title.trim() != "") {
      await searchMovie(title)
        .then(async (data) => {
          const apiResponse = data.data.data;
          setMovies(apiResponse);
        })
        .catch((error) => {
          toast.error("Error occured while fetching data");
        });
    } else toast.error("Please provide movie title");
  };

  // handle input fields onchange value
  const handleChange = async (e) => {
    setTitle(e.target.value);
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (title != "") {
      loadMovies();
    }
  };

  return (
    <>
      <div className="row">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group input-group mb-3">
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter movie's name here"
                aria-label="Movie's name"
                aria-describedby="search_button"
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="search_button"
              >
                Search <i className="fa fa-search"></i>
              </button>
            </div>
          </form>

          <div className="form-group">
            <div className="row">
              {movies ? (
                movies.length > 0 ? (
                  movies.map((movie) => {
                    return (
                      <div className="col-sm-3" key={movie.id}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">
                              {/* {movie.title} - {movie.theatre_id.title} */}
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
                                Rating: <b>{movie.rating}/5</b>
                              </span>
                              <br></br>
                              <span>
                                Price: <b>{movie.price}</b>
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
                  })
                ) : (
                  <>
                    <span className="text-center">
                      <h5>Sorry no any movie found with the name "{title}"</h5>
                    </span>
                  </>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieSearch;
