import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { getMovies } from "./Service";

const Movie = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = useCallback(() => {
    getMovies()
      .then((data) => {
        const apiResponse = data.data;
        setMovies(apiResponse);
      })
      .catch((error) => {
        toast.error("Error occured while fetching data");
      });
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <>
      <div className="row">
        <div className="col-12 text-end mb-2">
          <NavLink to="/movie/create">
            <button type="button" className="btn btn-sm btn-primary">
              Add New
            </button>
          </NavLink>
        </div>
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Price</th>
                <th scope="col">Currency</th>
                <th scope="col">Rating</th>
                <th scope="col">Genre</th>
                <th scope="col">Release Year</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr>
                  <th scope="row">{index+1}.</th>
                  <td>{movie.title}</td>
                  <td>{movie.status?"Active":"Inactive"}</td>
                  <td>{movie.price}</td>
                  <td>{movie.currency}</td>
                  <td>{movie.rating}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.release_year}</td>
                  <td>{new Date(movie.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Movie;
