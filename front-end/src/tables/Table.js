// dependencies
import React from 'react';
// local files
import './Table.css';
import { deleteTable, updateReservation, listTables } from '../utils/api';

const Table = ({ table, setTables }) => {
  /* ----- event handlers ----- */
  const handleFinishButton = async (table_id, reservation_id) => {
    const confirm = window.confirm(
      'Is this table ready to seat new guests? This cannot be undone.'
    );

    // if cancel is clicked, do nothing
    if (!confirm) return;
    try {
      const data = {
        data: {
          status: 'finished',
        },
      };

      await deleteTable(table_id);
      await updateReservation(reservation_id, data);
      const tableData = await listTables();
      setTables(tableData);
    } catch (error) {
      throw error;
    }
  };

  /* ----- render content ----- */
  return (
    <div className="Table">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title table-name">{table.table_name}</h5>
          <p className="card-text table-capacity">Capacity: {table.capacity}</p>
          {!table.reservation_id ? (
            <p
              className="card-text table-status"
              data-table-id-status={`${table.table_id}`}
            >
              Status: <span className="free">FREE</span>
            </p>
          ) : (
            <div>
              <p
                className="card-text table-status"
                data-table-id-status={table.table_id}
              >
                Status: <span className="occupied">OCCUPIED</span>
              </p>
              <div className="buttons">
                <button
                  className="btn brown-btn buttons"
                  data-table-id-finish={table.table_id}
                  type="button"
                  onClick={() =>
                    handleFinishButton(table.table_id, table.reservation_id)
                  }
                >
                  Finish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
