import axios from "axios";

// header configuration
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

// add the new movie
export const createMovie = async (data) => {
  const formData = {
    title: data.title,
    status: data.status == "1" ? true : false,
    description: data.description,
    price: data.price,
    currency: data.currency,
    genre: data.genre,
    theatre_id: data.theatre_id,
    release_year: data.release_year,
    play_time: data.play_time,
    director: data.director,
    star_casts: data.star_casts,
    rating: data.rating,
  };
  return axios.post(process.env.REACT_APP_API_URL + `movie`, formData, config);
};

// list all the movies
export const getMovies = async () => {
  return axios.get(process.env.REACT_APP_API_URL + `movie`, config);
};

// update the movie
export const updateMovie = async (id, data) => {
  const formData = {
    title: data.title,
    status: data.status == "1" ? true : false,
    description: data.description,
    price: data.price,
    currency: data.currency,
    genre: data.genre,
    theatre_id: data.theatre_id,
    release_year: data.release_year,
    play_time: data.play_time,
    director: data.director,
    star_casts: data.star_casts,
    rating: data.rating,
  };

  return axios.put(
    process.env.REACT_APP_API_URL + `movie/${id}`,
    formData,
    config
  );
};

// get specific movie from id
export const findMovie = async (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `movie/${id}`, config);
};

// delete the particular movie
export const deleteMovieFromId = async (id) => {
  return axios.delete(process.env.REACT_APP_API_URL + `movie/${id}`, config)
}