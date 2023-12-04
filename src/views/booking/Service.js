import axios from "axios";

// header configuration
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

// add the new booking
export const addBooking = async (data) => {
  const formData = {
    name: data.name,
    email: data.email,
    contact: data.contact,
    booking_date: data.booking_date,
    quantity: data.quantity,
    selected_seats: data.selected_seats,
    sub_total: data.sub_total,
    tax: data.tax,
    total: data.total,
    movie_id: data.movie_id,
  };
  return await axios.post(
    process.env.REACT_APP_API_URL + `booking`,
    formData,
    config
  );
};

// list all the bookings
export const getMovies = async () => {
  return await axios.get(process.env.REACT_APP_API_URL + `booking`, config);
};
