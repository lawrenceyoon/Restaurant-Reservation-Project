// dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// local files
import { today } from '../utils/date-time';
import ErrorAlert from '../layout/ErrorAlert';
import formatReservationTime from '../utils/format-reservation-time';

const NewReservation = () => {
  /* ----- useHistory ----- */
  const history = useHistory();

  /* ----- state ----- */
  const initialFormState = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    // reservation_date: today(),
    reservation_date: today(),
    reservation_time: '18:00:00',
    people: 1,
  };

  const [formData, setFormData] = useState({
    ...initialFormState,
  });
  const [formErrors, setFormErrors] = useState([]);

  /* ----- helper functions ----- */
  // checks if mobile_number is in proper format: all numbers XXX-XXX-XXXX
  const mobileNumberFormat = () => {
    let regExp7 = /^\(?([0-9]{3})\)?[-]?([0-9]{4})$/;
    let regExp10 = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    let match7 = formData.mobile_number.match(regExp7);
    let match10 = formData.mobile_number.match(regExp10);

    if (match7 || match10) return true;
    return false;
  };

  // returns the specific reservation_date as a number example: sun = 0, tues = 2, sat = 6
  const getReservationDay = () => {
    const year = formData.reservation_date.split('-')[0];
    const month = formData.reservation_date.split('-')[1] - 1;
    const day = formData.reservation_date.split('-')[2];
    const reservationDate = new Date(year, month, day);

    return reservationDate.getDay();
  };

  // returns positive number if reservation_date is > today
  const reservationMinusTodayDate = () => {
    const reservationDate = formData.reservation_date.split('-').join('');
    const todayDate = today().split('-').join('');

    return reservationDate - todayDate;
  };

  // if reservation_time is within bounds, returns true
  const reservationTimeIsValid = () => {
    let result = false;
    const reservMinusTodayDate = reservationMinusTodayDate();

    const reservationTime = Number(
      formatReservationTime(formData).reservation_time.split(':').join('')
    );
    let todayTime = new Date();
    let todayHours = String(todayTime.getHours());
    let todayMinutes = String(todayTime.getMinutes());

    if (todayHours < 10) todayHours = '0' + todayHours;
    if (todayMinutes < 10) todayMinutes = '0' + todayMinutes;

    todayTime = Number(todayHours + todayMinutes);

    if (reservationTime >= 1030 && reservationTime <= 2130) {
      result = true;
      if (reservMinusTodayDate === 0) {
        if (reservationTime > todayTime) {
          result = true;
        } else result = false;
      }
    }

    return result;
  };

  // error check, returns an array of errors, or empty array if everything's good
  const formValidation = () => {
    const mobileNumberFormatCheck = mobileNumberFormat();
    const reservationDateTuesdayCheck = getReservationDay();
    const reservMinusTodayDate = reservationMinusTodayDate();
    const reservationTimeIsValidCheck = reservationTimeIsValid();

    const array = [];

    // checks if mobile_number is formatted correctly: XXX-XXX-XXXX
    if (!mobileNumberFormatCheck)
      array.push(
        'The mobile number must be all numbers in format: XXX-XXXX OR XXX-XXX-XXXX'
      );
    // check if reservation_date is on Tuesday
    if (reservationDateTuesdayCheck === 2)
      array.push('We are closed on Tuesdays. No reservations allowed.');

    //check if reservation_date is in the past
    if (reservMinusTodayDate < 0)
      array.push('The reservation must be for today or a future date!');

    // check if reservation_time is valid
    if (!reservationTimeIsValidCheck)
      array.push(
        'The reservation time must be between 10:30AM - 9:30PM, and cannot be less than current time!'
      );

    return array;
  };

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // handles all form validations, returns an array with errors.
    const runFormValidation = formValidation();

    setFormErrors(runFormValidation);
    if (!runFormValidation.length) {
      try {
        const url = 'http://localhost:5000/reservations';
        const data = {
          data: formData,
        };

        await axios.post(url, data);
        history.push(`/dashboard/?date=${formData.reservation_date}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancelButton = () => {
    history.goBack();
  };

  /* ----- render content ----- */
  return (
    <section className="NewReservation">
      {/* Error messages */}
      {formErrors.map((error) => {
        return <ErrorAlert key={error} error={error} />;
      })}
      {/* */}
      <form onSubmit={handleFormSubmit}>
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
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancelButton}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default NewReservation;
