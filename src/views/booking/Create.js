import { render } from "react-dom";
import styles from "../../scss/theater.scss";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { findMovie } from "../movie/Service";
import { toast } from "react-toastify";
import Rating from "react-rating";

const BookingCreate = () => {
  const params = useParams();

  const [seat, setSeat] = useState(
    Array(10)
      .fill()
      .map((_) => Array(25).fill(false))
  );
  const [booked, setBooked] = useState([
    211,
    325,
    615,
    ,
    616,
    617,
    618,
    1011,
    922,
    923,
    924,
  ]);

  const [reserveSeat, setReserveSeat] = useState({});
  const [movie, setMovie] = useState("");

  const checkIsBooked = (row, seat) => {
    let bookedSeat = String(row) + String(seat);
    if (booked.includes(parseInt(bookedSeat))) return true;
    return false;
  };

  const handleSeatClick = (row, index) => {
    console.log(row, index);
    // Create a new array to avoid mutating the state directly
    const newSeats = [...seat];
    newSeats[row][index] = !newSeats[row][index];

    setSeat(newSeats);
  };

  // find movie from id
  const findMovieFromId = useCallback(() => {
    findMovie(params.id)
      .then((data) => {
        const returnData = data.data.data;
        setMovie(returnData);
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
        <div className="card">
          <div className="col-12">
            {/* <div className="container"> */}
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
              <div style={{ height: "190px", margin: "0" }}>
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
                      <td>{movie && movie.currency} {movie && movie.price}</td>
                    </tr>
                    <tr>
                      <th>Run Time</th>
                      <td>{movie && movie.play_time}</td>
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
                  <div className="row" key={row}>
                    {col.map((isReserved, i) => {
                      return (
                        <>
                          {checkIsBooked(row + 1, i + 1) ? (
                            <div className="seat sold" key={i}></div>
                          ) : (
                            <div
                              onClick={() => handleSeatClick(row, i)}
                              className={`seat ${isReserved ? "selected" : ""}`}
                              key={i}
                            ></div>
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

            <div className="row mt-md-2">
              <div className="form-group">
                <label className="col-md-6 control-label" htmlFor="name">
                  Name
                </label>
                <div className="col-md-6">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-6 control-label" htmlFor="email">
                  Email
                </label>
                <div className="col-md-6">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-6 control-label" htmlFor="phone">
                  Phone Number
                </label>
                <div className="col-md-6">
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-6 control-label" htmlFor="quantity">
                  Quantity
                </label>
                <div className="col-md-6">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-6 control-label" htmlFor="sub_total">
                  Sub Total
                </label>
                <div className="col-md-6">
                  <input
                    id="sub_total"
                    name="sub_total"
                    type="number"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-6 control-label" htmlFor="tax">
                  Tax
                </label>
                <div className="col-md-6">
                  <input
                    id="tax"
                    name="tax"
                    type="number"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-6 control-label" htmlFor="total">
                  Total
                </label>
                <div className="col-md-6">
                  <input
                    id="total"
                    name="total"
                    type="number"
                    placeholder=""
                    className="form-control input-md"
                  />
                </div>
              </div>

              <div className="form-group">
                <button className="btn btn-success text-white">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCreate;
