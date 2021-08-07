// dependencies
import React from 'react';
import { useHistory } from 'react-router-dom';
// local files
import './Form.css';
import formatReservationDate from '../utils/format-reservation-date';

const Form = ({ formData, setFormData, handleFormSubmit }) => {
  /* ----- useHistory ----- */
  const history = useHistory();

  // reservationDateFormat(obj);
  formatReservationDate(formData);

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

  const handleCancelButton = () => {
    history.goBack();
  };

  /* ----- render content ----- */
  return (
    <form className="Form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">First name:</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <label htmlFor="last_name">Last name:</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <label htmlFor="mobile_number">Mobile Number:</label>
        <input
          id="mobile_number"
          type="tel"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
        <label htmlFor="reservation_date">Reservation Date:</label>
        <input
          id="reservation_date"
          type="date"
          name="reservation_date"
          pattern="\d{4}-\d{2}-\d{2}"
          value={formData.reservation_date}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
          required
        />
        <label htmlFor="reservation_time">Reservation Time:</label>
        <input
          id="reservation_time"
          type="time"
          name="reservation_time"
          value={formData.reservation_time}
          onChange={handleChange}
          placeholder="HH:MM"
          required
        />
        <label htmlFor="people">People:</label>
        <input
          id="people"
          type="number"
          name="people"
          value={formData.people}
          onChange={handleNumberChange}
          required
        />
        <div className="buttons">
          <button className="btn submit-btn" type="submit">
            Submit
          </button>
          <button
            className="btn cancel-btn"
            type="button"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
