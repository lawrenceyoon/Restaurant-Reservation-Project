// dependencies
import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// local files

const Table = ({ table }) => {
  /* ----- useHistory ----- */
  const history = useHistory();

  /* ----- event handlers ----- */
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

  /* ----- render content ----- */
  return (
    <div className="table">
      <h3>Table Name: {table.table_name}</h3>
      <p>Table ID: {table.table_id}</p>
      <p>Capacity: {table.capacity}</p>
      {!table.reservation_id ? (
        <div className="free">
          <p data-table-id-status={`${table.table_id}`}>FREE</p>
        </div>
      ) : (
        <div className="occupied">
          <p data-table-id-status={table.table_id}>OCCUPIED</p>
          <button
            data-table-id-finish={table.table_id}
            type="button"
            onClick={() =>
              handleFinishButton(table.table_id, table.reservation_id)
            }
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
