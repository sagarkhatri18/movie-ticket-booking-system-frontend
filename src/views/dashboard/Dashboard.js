import React, { useState, useEffect, useCallback } from "react";
import { searchMovie, getActiveMovies } from "../movie/Service";
import { toast } from "react-toastify";
import SearchData from "./SearchData";

const Dashboard = () => {
  // set state
  const [title, setTitle] = useState(" ");
  const [movies, setMovies] = useState(null);

  // search movies on the basis of title
  const loadMovies = async (title) => {
    if (title.trim() != "") {
      await searchMovie(title)
        .then(async (data) => {
          const apiResponse = data.data.data;
          setMovies(apiResponse);
        })
        .catch((error) => {
          toast.error("Error occured while fetching data");
        });
    } else {
      getAllActiveMovies()
    }
  };

  // load all the active movies
  const getAllActiveMovies = useCallback(() => {
    getActiveMovies()
      .then((data) => {
        const apiResponse = data.data;
        setMovies(apiResponse);
      })
      .catch((error) => {
        toast.error("Error occured while fetching data");
      });
  },[]);

  // handle input fields onchange value
  const handleChange = async (e) => {
    setTitle(e.target.value);
    loadMovies(e.target.value);
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (title != "") {
      loadMovies(title);
    }
  };

  useEffect(() => {
    getAllActiveMovies();
  }, [getAllActiveMovies]);

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
                placeholder="Enter any movie's name here"
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
              {movies && movies != null ? (
                movies.length > 0 ? (
                  <SearchData data={movies} />
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

export default Dashboard;
