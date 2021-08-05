// dependencies
import React, { useState } from 'react';
// local files
import './Menu.css';
import { Link } from 'react-router-dom';

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

const Menu = () => {
  /* ----- state ----- */
  const [showItems, setShowItems] = useState(false);

  /* ----- helper functions ----- */
  let storedBG = null;
  showItems ? (storedBG = 'dark-bg') : (storedBG = 'transparent');

  /* ----- event handlers ----- */
  const handleIconClick = () => {
    setShowItems(!showItems);
  };

  /* ----- render content ----- */
  return (
    <div className={`Menu ${storedBG}`}>
      {showItems ? (
        <div>
          <span
            className="oi oi-minus minus-sign"
            onClick={handleIconClick}
          ></span>
          <nav>
            <ul>
              <li className="periodic-tables">
                <Link to="/">
                  <p>Periodic Tables</p>
                </Link>
                <hr className="sidebar-divider my-0" />
              </li>
              <li>
                <Link to="/dashboard">
                  <span className="oi oi-dashboard"></span>
                  <p>&nbsp;Dashboard</p>
                </Link>
              </li>
              <li>
                <Link to="/search">
                  <span className="oi oi-magnifying-glass"></span>
                  <p>&nbsp;Search</p>
                </Link>
              </li>
              <li>
                <Link to="/reservations/new">
                  <span className="oi oi-plus"></span>
                  <p>&nbsp;New Reservation</p>
                </Link>
              </li>
              <li>
                <Link to="/tables/new">
                  <span className="oi oi-layers"></span>
                  <p>&nbsp;New Table</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <span className="oi oi-plus plus-sign" onClick={handleIconClick}></span>
      )}
    </div>
  );

  // {
  //   showItems ? (
  //     <div className="Menu">
  //       <span className="oi oi-minus" onClick={handleIconClick}></span>
  //       <nav>
  //         <ul>
  //           <li>
  //             <Link to="/">Periodic Tables</Link>
  //             <hr className="sidebar-divider my-0" />
  //           </li>
  //           <li>
  //             <Link to="/dashboard">
  //               <span className="oi oi-dashboard"></span>
  //               &nbsp;Dashboard
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to="/search">
  //               <span className="oi oi-magnifying-glass"></span>
  //               &nbsp;Search
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to="/reservations/new">
  //               <span className="oi oi-plus"></span>
  //               &nbsp;New Reservation
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to="/tables/new">
  //               <span className="oi oi-layers"></span>
  //               &nbsp;New Table
  //             </Link>
  //           </li>
  //         </ul>
  //       </nav>
  //     </div>
  //   ) : (
  //     <span className="oi oi-plus" onClick={handleIconClick}></span>
  //   );
  // }
};

export default Menu;
