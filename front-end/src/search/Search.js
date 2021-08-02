// dependencies
import React, { useState } from 'react';
import axios from 'axios';
// local files
import Reservation from '../reservations/Reservation';

const Search = () => {
  /* ----- state ----- */
  const [mobileNumber, setMobileNumber] = useState('');
  const [reservations, setReservations] = useState([]);

  /* ----- event handlers ----- */
  const handleChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `http://localhost:5000/reservations?mobile_number=${mobileNumber}`;
      const response = await axios.get(url);

      setReservations(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const reservationsData = reservations.map((reservation) => (
    <Reservation key={reservation.reservation_id} reservation={reservation} />
  ));

  /* ----- render content ----- */
  return (
    <section className="Search">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            id="mobile_number"
            className="form-control"
            type="tel"
            name="mobile_number"
            placeholder="Enter a customer's phone number"
            value={mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Find</button>

        <section className="AllReservations">
          {!reservations.length ? (
            <div>No reservations found</div>
          ) : (
            reservationsData
          )}
        </section>
      </form>
    </section>
  );
};

export default Search;
