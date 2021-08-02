// dependencies
import React from 'react';
// local files

const Search = () => {
  return (
    <section className="Search">
      <form>
        <label htmlFor="mobile_number">
          Mobile Number:
          <input
            id="mobile_number"
            type="tel"
            name="mobile_number"
            placeholder="Enter a customer's phone number"
            required
          />
        </label>
      </form>
    </section>
  );
};

export default Search;
