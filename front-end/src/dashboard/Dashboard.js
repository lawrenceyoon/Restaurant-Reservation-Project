// dependencies
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// local files
import './Dashboard.css';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import { today, next, previous } from '../utils/date-time';
import useQuery from '../utils/useQuery';
import axios from 'axios';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  /* ----- useHistory, useQuery ----- */
  const history = useHistory();
  // if date props (today) is not passed in
  const query = useQuery();
  let date = query.get('date');

  if (!date) {
    date = today();
  }

  /* ----- state ----- */
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [reservation_date, setReservation_date] = useState(date);
  const [tables, setTables] = useState([]);

  /* ----- useEffect & loading API data ----- */
  // reservations
  useEffect(loadDashboard, [reservation_date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: reservation_date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationsData = reservations.map(
    ({
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_time,
      people,
      status,
    }) => (
      <section key={reservation_id}>
        <h3>
          {first_name} {last_name} ID #: {reservation_id}
        </h3>
        <p>Phone Number: {mobile_number}</p>
        <p>Reservation Time: {reservation_time}</p>
        <p>Number of people: {people}</p>
        <p data-reservation-id-status={reservation_id}>Status: {status}</p>
        {status === 'booked' ? (
          <Link to={`/reservations/${reservation_id}/seat`}>
            <button type="button">Seat</button>
          </Link>
        ) : null}
      </section>
    )
  );

  // tables
  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      try {
        const response = await fetch('http://localhost:5000/tables', {
          signal: abortController.signal,
        });
        const tablesFromAPI = await response.json();
        setTables(tablesFromAPI.data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
        } else {
          throw error;
        }
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);

  /* ----- event handler needs to be before finish button ----- */
  const handleFinishButton = async (table_id, reservation_id) => {
    const confirm = window.confirm(
      'Is this table ready to seat new guests? This cannot be undone.'
    );

    // if cancel is clicked, do nothing
    if (!confirm) return;
    try {
      // if ok is clicked, delete reservation_id from the table
      const tableUrl = `http://localhost:5000/tables/${table_id}/seat`;
      const reservationUrl = `http://localhost:5000/reservations/${reservation_id}/status`;
      const statusData = {
        data: {
          status: 'finished',
        },
      };

      await axios.delete(tableUrl);
      await axios.put(reservationUrl, statusData);
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  const tablesData = tables.map(
    ({ table_id, table_name, capacity, reservation_id }) => {
      return (
        <section key={table_id}>
          <h3>Table Name: {table_name}</h3>
          <p>Table ID: {table_id}</p>
          <p>Capacity: {capacity}</p>
          {!reservation_id ? (
            <div className="free">
              <p data-table-id-status={`${table_id}`}>FREE</p>
            </div>
          ) : (
            <div className="occupied">
              <p data-table-id-status={table_id}>OCCUPIED</p>
              <button
                data-table-id-finish={table_id}
                type="button"
                onClick={() => handleFinishButton(table_id, reservation_id)}
              >
                Finish
              </button>
            </div>
          )}
        </section>
      );
    }
  );

  /* ----- helper functions ----- */

  /* ----- event handlers ----- */
  const handleNextButton = () => {
    setReservation_date(next(reservation_date));
    history.push(`/dashboard/?date=${next(reservation_date)}`);
  };

  const handlePreviousButton = () => {
    setReservation_date(previous(reservation_date));
    history.push(`/dashboard/?date=${previous(reservation_date)}`);
  };

  const handleTodayButton = () => {
    setReservation_date(today());
    history.push(`/dashboard/${today()}`);
  };
  /* ----- render content ----- */
  return (
    <main className="Dashboard">
      <h1>Dashboard</h1>

      <section className="AllReservations">
        <div className="d-md-flex mb-3">
          <h2>Reservations for {reservation_date}</h2>
        </div>
        <ErrorAlert error={reservationsError} />
        {/* {JSON.stringify(reservations)} */}
        {reservationsData}
        <button
          type="button"
          className="btn previous"
          onClick={handlePreviousButton}
        >
          Previous
        </button>
        <button type="button" className="btn next" onClick={handleNextButton}>
          Next
        </button>
        <button type="button" className="btn today" onClick={handleTodayButton}>
          Today
        </button>
      </section>

      <section className="AllTables">
        <div className="d-md-flex mb-3">
          <h2>Tables for {reservation_date}</h2>
        </div>
        {tablesData}
      </section>
    </main>
  );
}

export default Dashboard;
