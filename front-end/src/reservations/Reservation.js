// dependencies
import React from 'react';
import { Link } from 'react-router-dom';
// local files

const Reservation = ({ reservation }) => {
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
    </div>
  );
};

export default Reservation;
