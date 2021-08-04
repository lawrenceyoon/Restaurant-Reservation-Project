// dependencies
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// local files
import './Reservation.css';

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
    <div className="Reservation">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title reservation-name">
            {reservation.first_name} {reservation.last_name}
          </h5>
          <p
            className="card-text"
            data-reservation-id-status={reservation.reservation_id}
          >
            <strong>Status:</strong> {reservation.status}
          </p>
          <p className="card-text">
            <strong>Phone Number:</strong> {reservation.mobile_number}
          </p>
          <p className="card-text">
            <strong>Reservation Time:</strong> {reservation.reservation_time}
          </p>
          <p className="card-text">
            <strong>People:</strong> {reservation.people}
          </p>
          {reservation.status === 'booked' ? (
            <p className="card-text">
              <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                <button className="btn btn-seat" type="button">
                  Seat
                </button>
              </Link>
            </p>
          ) : null}
          <p className="card-text">
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              <button className="btn btn-edit" type="button">
                Edit
              </button>
            </Link>
            <button
              data-reservation-id-cancel={reservation.reservation_id}
              className="btn btn-cancel"
              type="button"
              onClick={() => handleCancelButton(reservation.reservation_id)}
            >
              Cancel
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
