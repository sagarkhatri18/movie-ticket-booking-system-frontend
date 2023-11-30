import axios from "axios";

// header configuration
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

// add the new movie
export const createTheater = async (data) => {
  const formData = {
    title: data.title,
    slug: data.slug,
    status: data.status,
    seat_capacity: data.seat_capacity,
    no_of_rows: data.no_of_rows,
    seats_in_each_row: data.seats_in_each_row,
  };
  return axios.post(process.env.REACT_APP_API_URL + `theater`, formData, config);
};

// list all the movies
export const getTheater = async () => {
  return axios.get(process.env.REACT_APP_API_URL + `theater`, config)
}