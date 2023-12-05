import React from "react";
import Rating from "react-rating";

const BookingTicket = (props) => {
  const bookingData = props.data;

  return (
    <>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Name: </th>
            <td>{bookingData.name}</td>
          </tr>
          <tr>
            <th>Email: </th>
            <td>{bookingData.email}</td>
          </tr>
          <tr>
            <th>Contact: </th>
            <td>{bookingData.contact}</td>
          </tr>
          <tr>
            <th>Booked For: </th>
            <td>{bookingData.booking_date}</td>
          </tr>
          <tr>
            <th>No of tickets: </th>
            <td>{bookingData.quantity}</td>
          </tr>
          <tr>
            <th>Seats: </th>
            <td>{bookingData.selected_seats.join(", ")}</td>
          </tr>
          <tr>
            <th>Total Price: </th>
            <td>
              ${bookingData.total} in {bookingData.movie_id.currency}
            </td>
          </tr>
          <tr>
            <th>Status: </th>
            <td>PAID</td>
          </tr>
          <tr>
            <th>Movie: </th>
            <td>{bookingData.movie_id.title}</td>
          </tr>
          <tr>
            <th>Rating</th>
            <td>
              <Rating
                stop={5}
                readonly
                placeholderRating={bookingData.movie_id.rating}
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
          <tr>
            <th>Theatre: </th>
            <td>{bookingData.movie_id.theatre_id.title}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default BookingTicket;
