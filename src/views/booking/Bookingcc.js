import React, { useState } from 'react';
import styles from '../../scss/movie_ticketing.scss'

const MovieTicketBooking = () => {
    const [seats, setSeats] = useState(Array(36).fill(false)); // Assuming 36 seats in the theater
  
    const handleSeatClick = (index) => {
      // Create a new array to avoid mutating the state directly
      const newSeats = [...seats];
      newSeats[index] = !newSeats[index];
      setSeats(newSeats);
    };
  
    return (
      <div className="movie-ticket-booking">
        <h2>Movie Ticket Booking</h2>
        <div className="seat-grid">
          {seats.map((isReserved, index) => (
            <div
              key={index}
              className={`seat ${isReserved ? 'reserved' : ''}`}
              onClick={() => handleSeatClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <p className="legend">
          <span className="seat legend-available">Available</span>
          <span className="seat legend-reserved">Reserved</span>
        </p>
      </div>
    );
  };
  
  export default MovieTicketBooking;