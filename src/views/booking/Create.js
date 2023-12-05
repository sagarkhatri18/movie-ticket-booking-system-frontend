import { render } from "react-dom";
import styles from "../../scss/theater.scss";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findMovie } from "../movie/Service";
import { toast } from "react-toastify";
import Rating from "react-rating";
import { BookingDate } from "../../helpers/Helper";
import { addBooking, getBookedSeats } from "./Service";
// Validator Packages
import SimpleReactValidator from "simple-react-validator";

const BookingCreate = () => {
  const params = useParams();
  const navigate = useNavigate();

  // Validator Imports
  const validator = useRef(new SimpleReactValidator()).current;
  const [, forceUpdate] = useState();

  const [seat, setSeat] = useState([]);
  const [booked, setBooked] = useState([11, 45, 75, 35, 310, 1010]);

  const [movie, setMovie] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    contact: "",
    quantity: 0,
    sub_total: 0,
    status: true,
    tax: 0,
    total: 0,
    movie_id: "",
    booking_date: BookingDate(),
    selected_seats: "",
  });

  const checkIsBooked = (row, seat) => {
    let bookedSeat = String(row) + String(seat);
    return booked.includes(parseInt(bookedSeat));
  };

  const handleSeatClick = (row, index) => {
    // Create a new array to avoid mutating the state directly
    const newSeats = [...seat];
    newSeats[row - 1][index - 1] = !newSeats[row - 1][index - 1];

    setSeat(newSeats);

    // check if the seats is alredy been selected or not
    if (selectedSeats.length > 0) {
      let seatsArray = [...selectedSeats];

      if (seatsArray.includes(`${row}${index}`)) {
        var result = seatsArray.filter((e) => e !== `${row}${index}`);
        setSelectedSeats(result);
      } else {
        setSelectedSeats((oldArray) => [...oldArray, `${row}${index}`]);
      }
    } else {
      setSelectedSeats((oldArray) => [...oldArray, `${row}${index}`]);
    }
    console.log(selectedSeats);
    calculatePrice(newSeats);
  };

  // find movie from id
  const findMovieFromId = useCallback(() => {
    findMovie(params.id)
      .then((data) => {
        const returnData = data.data.data;
        bookedSeats();

        setSeat(
          Array(returnData.theatre_id.no_of_rows)
            .fill()
            .map((_) =>
              Array(returnData.theatre_id.seats_in_each_row).fill(false)
            )
        );
        setMovie(returnData);
      })
      .catch((error) => {
        toast.error("Error occured while fetching data");
      });
  }, [params.id]);

  // calculate price from seat selected
  const calculatePrice = (newSeats) => {
    var selectedSeatCount = 0;
    newSeats.map((seats) => {
      seats.map((value) => {
        if (value) {
          selectedSeatCount++;
        }
      });
    });

    var pricePerSeat = movie.price;
    var subTotalPrice = parseInt(pricePerSeat) * selectedSeatCount;
    var taxPrice = parseFloat((0.13 * subTotalPrice).toFixed(2));
    var totalPrice = parseFloat(
      (parseInt(subTotalPrice) + parseFloat(taxPrice)).toFixed(2)
    );

    booking.quantity = selectedSeatCount;
    booking.sub_total = subTotalPrice;
    booking.tax = taxPrice;
    booking.total = totalPrice;
  };

  // get booked seats
  const bookedSeats = () => {
    const formData = {
      movie_id: params.id,
      booking_date: BookingDate(),
    };
    getBookedSeats(formData)
      .then((data) => {
        setBooked(data.data.data);
      })
      .catch((error) => {
        toast.error("Error occured while fetching data");
      });
  };

  useEffect(() => {
    findMovieFromId();
  }, [findMovieFromId]);

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validator.allValid()) {
      if (booking.quantity < 1) {
        toast.error("At least one seat should be selected to proceed");
        return false;
      } else {
        booking.movie_id = movie._id;
        booking.selected_seats = selectedSeats;

        addBooking(booking)
          .then((data) => {
            toast.success(data.data.message);
            navigate("/booking");
          })
          .catch((error) => {
            toast.error(error.response.data);
          });
      }
    } else {
      validator.showMessages();
      forceUpdate(1);
    }
  };

  // handle input fields onchange value
  const handleChange = (e) => {
    setBooking((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="row">
        <div className="card">
          <div className="col-12">
            <div className="row">
              <ul className="showcase ">
                <li>
                  <div className="seat"></div>
                  <small>Available</small>
                </li>
                <li>
                  <div className="seat selected"></div>
                  <small>Selected</small>
                </li>
                <li>
                  <div className="seat sold"></div>
                  <small>Sold</small>
                </li>
              </ul>
            </div>
            <div className="row">
              <div style={{ height: "230px", margin: "0" }}>
                <table className="table table-bordered table-sm">
                  <tbody>
                    <tr>
                      <th>Movie Name</th>
                      <td>{movie && movie.title}</td>
                    </tr>
                    <tr>
                      <th>Theatre</th>
                      <td>{movie && movie.theatre_id.title}</td>
                    </tr>
                    <tr>
                      <th>Price per ticket</th>
                      <td>
                        {movie && movie.currency} {movie && movie.price}
                      </td>
                    </tr>
                    <tr>
                      <th>Run Time</th>
                      <td>{movie && movie.play_time}</td>
                    </tr>
                    <tr>
                      <th>Booking Date</th>
                      <td>{BookingDate()}</td>
                    </tr>
                    <tr>
                      <th>Rating</th>
                      <td>
                        <Rating
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
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {seat.map((col, row) => {
                return (
                  <div className="row" key={row + "first"}>
                    {col.map((isReserved, i) => {
                      return (
                        <>
                          {checkIsBooked(row + 1, i + 1) ? (
                            <div className="seat sold" key={i + "second"}></div>
                          ) : (
                            <div
                              onClick={() => handleSeatClick(row + 1, i + 1)}
                              className={`seat ${isReserved ? "selected" : ""}`}
                              key={i + "third"}
                            >
                              {String(row + 1) + " - " + String(i + 1)}
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                );
              })}
              <div
                className="screen"
                style={{ height: "30px", margin: "0" }}
              ></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <label className="col-md-6 control-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="form-control input-md"
                  />
                  {validator.message("name", booking.name, "required")}
                </div>
                <div className="col">
                  <label className="col-md-6 control-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="form-control input-md"
                  />
                  {validator.message(
                    "email address",
                    booking.email,
                    "required"
                  )}
                </div>
                <div className="col">
                  <label className="col-md-6 control-label" htmlFor="contact">
                    Contact Number
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    className="form-control input-md"
                  />
                  {validator.message("contact", booking.contact, "required")}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label className="control-label" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    disabled={true}
                    value={booking.quantity}
                    name="quantity"
                    type="number"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
                <div className="col-6"></div>
                <div className="col-6">
                  <label className="control-label" htmlFor="sub_total">
                    Sub Total
                  </label>
                  <input
                    disabled={true}
                    id="sub_total"
                    value={booking.sub_total}
                    name="sub_total"
                    type="text"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
                <div className="col-6"></div>

                <div className="col-6">
                  <label className="control-label" htmlFor="tax">
                    Tax (13% HST)
                  </label>
                  <input
                    id="tax"
                    disabled={true}
                    name="tax"
                    a
                    value={booking.tax}
                    type="text"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
                <div className="col-6"></div>

                <div className="col-6">
                  <label className="control-label" htmlFor="total">
                    Total
                  </label>
                  <input
                    id="total"
                    disabled={true}
                    name="total"
                    value={booking.total}
                    type="text"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-success text-white" type="submit">
                    Proceed to Checkout <i className="fa fa-credit-card"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCreate;
