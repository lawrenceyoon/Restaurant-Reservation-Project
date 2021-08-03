// dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// local files

const Reservation = ({ reservation }) => {
  /* ----- useHistory ----- */
  const history = useHistory();

  /* ----- event handlers ----- */
  const handleCancelButton = async (reservation_id) => {
    const confirm = window.confirm(
      'Do you want to cancel this reservation? This cannot be undone.'
    );

    // if cancel is clicked, do nothing
    if (!confirm) return;
    // if ok is clicked, set status to cancelled
    try {
      const reservationUrl = `http://localhost:5000/reservations/${reservation_id}/status`;
      const statusData = {
        data: {
          status: 'cancelled',
        },
      };

      await axios.put(reservationUrl, statusData);
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  /* ----- render content ----- */
  return (
    <div className="reservation">
      <h3>
        {reservation.first_name} {reservation.last_name} ID #:{' '}
        {reservation.reservation_id}
      </h3>
      <p>Phone Number: {reservation.mobile_number}</p>
      <p>Reservation Time: {reservation.reservation_time}</p>
      <p>Number of people: {reservation.people}</p>
      <p data-reservation-id-status={reservation.reservation_id}>
        Status: {reservation.status}
      </p>
      {reservation.status === 'booked' ? (
        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
          <button type="button">Seat</button>
        </Link>
      ) : null}
      <br />
      <Link to={`/reservations/${reservation.reservation_id}/edit`}>
        <button type="button">Edit</button>
      </Link>
      <button
        data-reservation-id-cancel={reservation.reservation_id}
        type="button"
        onClick={() => handleCancelButton(reservation.reservation_id)}
      >
        Cancel
      </button>
    </div>
  );
};

export default Reservation;
