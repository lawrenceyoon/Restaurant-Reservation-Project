// dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
// local files
import './ReservationSeat.css';

const ReservationSeat = () => {
  /* ----- useHistory, useParams ----- */
  const history = useHistory();
  const { reservation_id } = useParams();

  /* ----- state ----- */
  const initialFormState = {
    table_id: '',
  };

  const [formData, setFormData] = useState({
    ...initialFormState,
  });
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState([]);

  /* ----- useEffect & loading API data ----- */
  // reservations
  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservations() {
      try {
        const response = await fetch(`http://localhost:5000/reservations/`, {
          signal: abortController.signal,
        });
        const reservationsFromAPI = await response.json();
        setReservations(reservationsFromAPI.data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
        } else {
          throw error;
        }
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, []);

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

  // tables
  const tableData = tables.map(({ table_id, table_name, capacity }) => (
    <option key={table_id} value={table_id}>
      {table_name} - {capacity}
    </option>
  ));

  /* --- helper functions ----- */
  // returns the correct reservation object where reservation_id from API matches the params
  const getSelectedReservation = () => {
    return reservations.find(
      (reservation) => reservation.reservation_id === Number(reservation_id)
    );
  };

  // returns the correct table object where table_id from API matches the formData table_id selected
  const getSelectedTable = () => {
    return tables.find((table) => table.table_id === Number(formData.table_id));
  };

  // returns the correct table's reservation_id
  const getSelectedTablesReservationId = () => {
    const getCorrectTable = getSelectedTable();
    if (getCorrectTable) return getCorrectTable.reservation_id;
  };

  // error check, returns an array of errors, or empty array if everything's good
  const errorValidation = () => {
    const array = [];
    const getCorrectReservation = getSelectedReservation();
    const getCorrectTable = getSelectedTable();
    const getCorrectTablesReservationId = getSelectedTablesReservationId();

    // no option is selected
    if (getCorrectTablesReservationId === undefined) {
      array.push('Please select a table!');
      return array;
    }

    // if people surpasses the table capacity
    if (getCorrectReservation.people > getCorrectTable.capacity) {
      array.push('The number of people exceeds the table capacity.');
    }

    // if the table already has a reservation_id
    if (getCorrectTablesReservationId !== null) {
      array.push('The table already has a reservation!');
    }

    return array;
  };

  /* ----- event handlers ----- */
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const runErrorValidation = errorValidation();
    setErrors(runErrorValidation);

    if (!runErrorValidation.length) {
      try {
        // do post request here
        const tablesUrl = `http://localhost:5000/tables/${formData.table_id}/seat`;
        const reservationUrl = `http://localhost:5000/reservations/${reservation_id}/status`;
        const reservationIdData = {
          data: {
            reservation_id,
          },
        };
        const statusData = {
          data: {
            status: 'seated',
          },
        };

        await axios.put(tablesUrl, reservationIdData);
        await axios.put(reservationUrl, statusData);
        history.push(`/dashboard`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancelButton = () => {
    history.goBack();
  };

  /* ----- render content ----- */
  return (
    <div className="ReservationSeat">
      {/* Error messages */}
      {errors.map((error) => {
        return <ErrorAlert key={error} error={error} />;
      })}
      {/* */}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="table_id">Select Table:</label>
        <select
          id="table_id"
          name="table_id"
          onChange={handleChange}
          value={FormData.table_id}
        >
          <option value="">-- Select an Option --</option>
          {tableData}
        </select>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancelButton}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ReservationSeat;
