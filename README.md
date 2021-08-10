# Restaurant Reservation Project

A full-stack application built for owners who want to manage their reservations and tables at their restaurant.

## Installation

Install restaurant-reservation-project with npm

Clone the project

```bash
   https://github.com/lawrenceyoon/Restaurant-Reservation-Project.git
```

Go to project directory

```bash
   cd restaurant-reservation-project
```

Install dependencies

```bash
   npm install
```

Start the server (starts up both client & server)

```bash
   npm run start:dev
```

## Deployed Links / development Links

### Production/Development Links & Endpoints:

#### Front-End

Production: https://restaurant-fullstack-frontend.herokuapp.com/dashboard
<br>
Development: localhost:3000

- Endpoints:
  <br>
  /dashboard (main homepage)
  <br>
  /dashboard/?date=2021-08-09 (shows reservations for that specific date- in this case for Aug 9, 2021)
  <br>
  /reservations (redirects to dashboard)
  <br>
  /reservations/new (create a new reservation)
  <br>
  /reservations/:reservation_id/seat (seat a 'booked' reservation to a table)
  <br>
  /reservations/:reservation_id/edit (edit a specific reservation - can only edit 'booked' reservations)
  <br>
  /tables/new (create a new table)
  <br>
  /search (search for past, current, future reservations with matching phone number)
  <br>
  /otherRoutes (all other routes will display a Not Found page)

#### Back-End

Production: https://restaurant-fullstack-backend.herokuapp.com
<br>
Development: localhost:5000

- Endpoints & CRUDL with RESTful API best practices:
  <br>
  /reservations (list, create)
  <br>
  /reservations/:reservation_id (read, update)
  <br>
  /reservations/:reservation_id/status (update)
  <br>
  /tables (list, create)
  <br>
  /tables/:table_id (read)
  <br>
  /tables/table_id/seat/ (update, delete)

## Context

This project is a monorepo (both client and backend folders under same directory) that was built on my own to demonstrate my knowledge of a full-stack application. Properly routed to the API backend, it does all CRUDL (create, read, update, delete, list) following best RESTful API practices. This project (had a blast creating this), taught me key concepts on how the front-end connects to the back-end, how API calls are made as a request to the backend, and received as a response in the client. I made 4 relational databases: for development, testing, preview, and production.

### Additional Noteworthy Tools Used:

#### Client

1. Google Fonts for cursive font
2. Bootstrap and Flexbox for CSS and icons
3. Jest for testing
4. React Router DOM Links and additional functions to properly route front-end
5. Axios, fetch, useEffect to make calls to back-end API

#### Server

1. Postman to make requests to server
2. dotenv to properly store and use env variables
3. ElephantSQL to host relational databases
4. DBeaver to check and view databases
5. Knex to make calls to database to retrieve proper info, create and seed database with tables and data
6. Jest for testing

## Steps

I made 8 user stories, based on what a real world project would be like. Here the user stories and screenshots:

1. A restaurant manager wants to create a new reservation when a customer calls, so he/she will know how many customers will arrive at the restaurant on a given day...

   1. The /reservations/new page has all the required fields. Mobile number must be numbers in format XXX-XXXX OR XXX-XXXX, number of people must be at least 1:
      ![New Reservation fields](/screenshot-imgs/new-reservation.png?raw=true 'Fields')
   2. Clicking on submit saves new reservation, then display /dashboard for the date the new reservation was made
   3. Cancel button returns user to previous page
   4. /dashboard page lists all reservations for that specific date.
      ![08-11-2021](/screenshot-imgs/08-11-2021.png?raw=true)
      ![proper reservations](/screenshot-imgs/reservations-for-proper-date.png?raw=true)
   5. Display next, previous, today buttons that allow user to go to other dates
      ![previous, next, today buttons](/screenshot-imgs/previous-next-today-btns.png?raw=true)
   6. /reservations API has same validations as above and returns 400 when validation error occurs

2. A restaurant manager wants to allow reservations to be created on a day we're open, so users do not accidentally create a reservation for days we are closed...

   1. /reservations/new page displays errors messages if reservation falls on a Tuesday (closed) or reservation date is in the past <br>
      ![closed on Tuesdays](/screenshot-imgs/closed-tuesdays.png?raw=true)
      ![today or future date](/screenshot-imgs/today-or-future.png?raw=true)
   2. /reservations API has same validations as above and returns 400 when validation error occurs

3. A restaurant manager wants to allow reservations to be created during business hours, up to 60 minutes before closing so users do not accidentally create reservation for a time we cannot accommodate...

   1. /reservations/new page displays errors messages if reservation time is before 10:30AM, after 9:30PM, reservation date + time are in the past (if date is for today, only time that's greater than now is allowed)
      ![between working hours](/screenshot-imgs/between-hours.png?raw=true)
   2. /reservations API has same validations as above and returns 400 when validation error occurs

4. A restaurant manager wants to seat an existing restaurant at a table, so he/she will know which tables are occupied and free...

   1. /tables/new page will have table name and capacity as fields. A submit button (saves the new table) and a cancel button that returns user to previous page.
      ![tables new page](/screenshot-imgs/table-new.png?raw=true)
   2. /dashboard page will display list or all reservations in one area, and each reservation has a 'seat' button. Display a list of all tables in another area, with status of 'free' or 'occupied'
      ![dashboard](/screenshot-imgs/dashboard.png?raw=true);
      ![proper reservations](/screenshot-imgs/reservations-for-proper-date.png?raw=true)
      ![tables](/screenshot-imgs/tables.png?raw=true)
   3. /reservations/:reservation_id/seat page has each table name and capacity as an option. A submit button assigns table to reservation and displays /dashboard, a cancel button that returns user to previous page.
      ![select table](/screenshot-imgs/select-table.png?raw=true)
   4. Reservation with people cannot be assigned if it's more than capacity of table
      ![exceeds capacity](/screenshot-imgs/exceeds-capacity.png?raw=true)
   5. Reservation cannot be seated if table is already taken
      <br>
      ![already reserved](/screenshot-imgs/already-reserved.png?raw=true)
   6. /tables API has same validations as above and returns 400 when validation error occurs

5. A restaurant manager wants to free up an occupied table when guests leave, so he/she can seat new guests at the table...

   1. /dashboard page displays a 'finish' button on each 'occupied' table. Clicking finish will display a confirmation: if 'yes' is clicked, delete the table assignment. Cancel will do nothing.
      ![bar-1 finish](/screenshot-imgs/bar-1-finish.png?raw=true)
      <br>
      ![bar-1 confirmation](/screenshot-imgs/bar-1-confirmation.png?raw=true)

6. A restaurant manager wants a reservation to have a status of 'booked', 'seated', or 'finished,' so users can see which parties are seated; finished reservations must be hidden from dashboard...

   1. /dashboard page displays status of reservation. Creating new reservation has default status of 'booked.'
   2. display 'seat' button only when reservation status is 'booked' - clicking seat button changes status to 'seated' and hides seat button.
      ![seated and booked reservations](/screenshot-imgs/seated-and-booked.png?raw=true)
   3. clicking 'finish' button changes reservation status to 'finished' and removes reservation from dashboard
      ![hello there](/screenshot-imgs/hello-there.png?raw=true)

7. A restaurant manager wants to search for a reservation by phone number (partial or complete) so he/she can quickly access the customer's reservation when the guest(s) call about their reservation...

   1. /search page displays search box with a 'find' button next to it. Then will display all matched phone reservations.
      ![search by phone number](/screenshot-imgs/search.png?raw=true)
   2. Display 'No Reservations Found' if no records are found.
      ![no reservations found](/screenshot-imgs/no-reservations-found.png?raw=true)

8. A restaurant manager wants to modify a reservation if a customer calls to change/cancel their reservations. This is so that reservations are up to date and accurate...

   1. /dashboard and /search page shows 'edit' button next to each reservation. Clicking edit will navigate user to /reservations/:reservation_id/edit page. Edit page shows current reservation, and form to make changes when 'submit' is clicked. Cancel returns to previous page.
      ![hello there](/screenshot-imgs/hello-there.png?raw=true)
      ![current reservation info](/screenshot-imgs/current-reservation-info.png?raw=true)
      ![edit reservation](/screenshot-imgs/edit.png?raw=true)
   2. Display a cancel button next to each reservation. Cancel button will have a confirmation window. Clicking 'yes' sets reservation status to cancelled and removes from dashboard. Clicking 'cancel' makes no changes.
      <br>
      ![cancel window](/screenshot-imgs/cancel-window.png?raw=true)
   3. Only status of 'booked' can be edited; remove 'edit' or 'cancel' if reservation is already seated
      ![seated and booked](/screenshot-imgs/seated-and-booked.png?raw=true)

## Tech Stack

**Client:** HTML, CSS (Flexbox + Bootstrap), JavaScript (ReactJS + Hooks)

**Server:** NodeJS, Express + Knex, PostgreSQL (ElephantSQL + DBeaver)

**Deployment:** Heroku
