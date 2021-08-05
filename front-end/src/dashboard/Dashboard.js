// dependencies
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// local files
import './Dashboard.css';
import greenleaf from '../imgs/greenleaf.png';
import Footer from '../layout/Footer';
import Reservation from '../reservations/Reservation';
import Table from '../tables/Table';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import { today, next, previous } from '../utils/date-time';
import useQuery from '../utils/useQuery';
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

  const reservationsData = reservations.map((reservation) => (
    <Reservation key={reservation.reservation_id} reservation={reservation} />
  ));

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

  const tablesData = tables.map((table) => (
    <Table key={table.table_id} table={table} />
  ));

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
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      <h1>Dashboard</h1>
      <h2>{reservation_date}</h2>
      <section className="AllReservations">
        <div className="green-leaf">
          <img src={greenleaf} alt="green leaf" />
        </div>
        <h3>Reservations</h3>
        <div className="buttons">
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
          <button
            type="button"
            className="btn today"
            onClick={handleTodayButton}
          >
            Today
          </button>
        </div>
        <div className="reservations-data">{reservationsData}</div>
      </section>

      <section className="AllTables">
        <div className="green-leaf">
          <img src={greenleaf} alt="green leaf" />
        </div>
        <h3>Tables</h3>

        <div className="tables-data">{tablesData}</div>
      </section>

      <Footer />
    </main>
  );
}

export default Dashboard;
