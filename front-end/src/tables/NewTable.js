// dependencies
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// local files
import './NewTable.css';

const NewTable = () => {
  /* ----- useHistory ----- */
  const history = useHistory();

  /* ----- state ----- */
  const initialFormState = {
    table_name: '',
    capacity: '',
  };

  const [formData, setFormData] = useState({
    ...initialFormState,
  });

  /* ----- event handlers ----- */
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleNumberChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const url = 'http://localhost:5000/tables';
    const data = {
      data: formData,
    };
    axios
      .post(url, data)
      .then(() => history.push(`/dashboard`))
      .catch((err) => {
        console.error(err);
      });
    // history.push(`/dashboard`);
  };

  const handleCancelButton = () => {
    history.goBack();
  };

  /* ----- render content ----- */
  return (
    <div className="NewTable">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="table_name">
          <input
            id="table_name"
            type="text"
            name="table_name"
            value={formData.table_name}
            onChange={handleChange}
            placeholder="Table Name"
            minLength="2"
            required
          />
        </label>
        <label htmlFor="capacity">
          <input
            id="capacity"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleNumberChange}
            placeholder="1"
            min="1"
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancelButton}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewTable;
