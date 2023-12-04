import axios from "axios";

// header configuration
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

// add the new movie
export const createTheatre = async (data) => {
  const formData = {
    title: data.title,
    slug: data.slug,
    status: data.status == "1" ? true : false,
    seat_capacity: data.seat_capacity,
    no_of_rows: data.no_of_rows,
    seats_in_each_row: data.seats_in_each_row,
  };
  return axios.post(
    process.env.REACT_APP_API_URL + `theatre`,
    formData,
    config
  );
};

// update the theatre
export const updateTheatre = async (id, data) => {
  const formData = {
    title: data.title,
    slug: data.slug,
    status: data.status == "1" ? true : false,
    seat_capacity: data.seat_capacity,
    no_of_rows: data.no_of_rows,
    seats_in_each_row: data.seats_in_each_row,
  };

  return axios.put(
    process.env.REACT_APP_API_URL + `theatre/${id}`,
    formData,
    config
  );
};

// list all the theatres
export const getTheatres = async () => {
  return axios.get(process.env.REACT_APP_API_URL + `theatre`, config);
};

// list only active theatres
export const getActiveTheatres = async () => {
  return axios.get(process.env.REACT_APP_API_URL + `theatre/active/lists`, config);
};

// get specific theatre from id
export const findTheatre = async (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `theatre/${id}`, config);
};

// delete the particular movie
export const deleteTheatreFromId = async (id) => {
  return axios.delete(process.env.REACT_APP_API_URL + `theatre/${id}`, config);
};
