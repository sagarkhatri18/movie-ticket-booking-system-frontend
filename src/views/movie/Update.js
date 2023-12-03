import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Validator Packages
import SimpleReactValidator from "simple-react-validator";
import { updateMovie, findMovie } from "./Service";
import { Error } from "../../helpers/Error";
import { toast } from "react-toastify";

const Update = () => {
  const navigate = useNavigate();
  const params = useParams();

  // set state
  const [state, setState] = useState({
    title: "",
    status: "",
    description: "",
    price: "",
    currency: "",
    genre: "",
    theatre_id: "",
    release_year: "",
    play_time: "",
    director: "",
    star_casts: "",
    rating: "",
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

  // handle input fields onchange value
  const handleChangeRadio = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: (e.target.value == "1")?true:false,
    }));
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validator.allValid()) {
      updateMovie(params.id, state)
        .then((data) => {
          navigate("/movie");
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

  const movieGenre = [
    "ACTION",
    "ADVENTURE",
    "ANIMATION",
    "COMEDY",
    "DRAMA",
    "HORROR",
    "SCIFI",
    "THRILLER",
    "ROMANCE",
  ];

  // find movie from id
  const findMovieFromId = useCallback(() => {
    findMovie(params.id)
      .then((data) => {
        const returnData = data.data.data;
        setState(returnData);
      })
      .catch((error) => {
        toast.error("Error occured while fetching data");
      });
  }, [params.id]);

  useEffect(() => {
    findMovieFromId();
  }, [findMovieFromId]);

  return (
    <>
      <div className="row">
        <Error errors={error} />
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="col-12">
              <div className="form-group">
                <label className="col-md-4" htmlFor="title">
                  Movie Title
                </label>
                <div className="col-md-4">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter the movie title here"
                    className="form-control input-md"
                    value={state.title}
                    onChange={handleChange}
                  />
                  {validator.message("movie title", state.title, "required")}
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
                      checked={state.status}
                      onChange={handleChangeRadio}
                    />
                    Active
                  </label>
                  <label className="radio-inline" htmlFor="status">
                    <input
                      type="radio"
                      name="status"
                      id="status-1"
                      value="0"
                      checked={!state.status}
                      onChange={handleChangeRadio}
                    />
                    Inactive
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="description">
                  Description
                </label>
                <div className="col-md-4">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Add movie description here"
                    onChange={handleChange}
                    value={state.description}
                  ></textarea>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="price">
                  Price
                </label>
                <div className="col-md-4">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                    min={1}
                    onChange={handleChange}
                    value={state.price}
                    className="form-control input-md"
                  />
                  {validator.message("movie price", state.price, "required")}
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="currency">
                  Currency
                </label>

                <div className="col-md-4">
                  <select
                    id="currency"
                    name="currency"
                    className="form-control"
                    value={state.currency}
                    onChange={handleChange}
                  >
                    <option value="CAD" key="CAD">
                      CAD
                    </option>
                    <option value="USD" key="USD">
                      USD
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="genre">
                  Genre
                </label>
                <div className="col-md-4">
                  <select
                    id="genre"
                    name="genre"
                    className="form-control"
                    value={state.genre}
                    onChange={handleChange}
                  >
                    {movieGenre.map((genre) => (
                      <option value={genre} key={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  {validator.message("movie genre", state.genre, "required")}
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="theatre_id">
                  Theatre
                </label>
                <div className="col-md-4">
                  <select
                    id="theatre_id"
                    name="theatre_id"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="1">Option one</option>
                    <option value="2">Option two</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  htmlFor="release_year"
                >
                  Realese Year
                </label>
                <div className="col-md-4">
                  <input
                    type="number"
                    id="release_year"
                    className="form-control input-md"
                    name="release_year"
                    max={new Date().getFullYear()}
                    min="1900"
                    step="1"
                    placeholder="Enter the movie release year"
                    value={state.release_year}
                    onChange={handleChange}
                  />
                  {validator.message(
                    "movie release year",
                    state.release_year,
                    "required|numeric"
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="play_time">
                  Play Time
                </label>
                <div className="col-md-4">
                  <input
                    id="play_time"
                    name="play_time"
                    type="text"
                    placeholder="Enter the movie play time"
                    className="form-control input-md"
                    value={state.play_time}
                    onChange={handleChange}
                  />
                  {validator.message(
                    "movie play time",
                    state.play_time,
                    "required"
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="director">
                  Director
                </label>
                <div className="col-md-4">
                  <input
                    id="director"
                    name="director"
                    type="text"
                    placeholder="Enter the movie director"
                    className="form-control input-md"
                    value={state.director}
                    onChange={handleChange}
                  />
                  {validator.message("director", state.director, "required")}
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="star_casts">
                  Star Cast
                </label>
                <div className="col-md-4">
                  <input
                    id="star_casts"
                    name="star_casts"
                    type="text"
                    placeholder="Enter the movie star casts here"
                    className="form-control input-md"
                    value={state.star_casts}
                    onChange={handleChange}
                  />
                  {validator.message(
                    "star casts",
                    state.star_casts,
                    "required"
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="rating">
                  Rating
                </label>
                <div className="col-md-4">
                  <input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={state.rating}
                    placeholder="Enter the movie rating here"
                    className="form-control input-md"
                    onChange={handleChange}
                  />
                  {validator.message(
                    "movie rating",
                    state.rating,
                    "required|numeric"
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

export default Update;