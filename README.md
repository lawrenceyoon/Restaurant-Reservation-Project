# Restaurant Reservation Project

A full-stack application built for owners who want to manage their reservations and tables at their restaurant.

## Deployed Links / development Links

### Production/Development Links & Endpoints:

- on main dir, run => npm run start:dev for development (starts up both the front-end and back-end)

#### Front-End

Production: https://restaurant-fullstack-frontend.herokuapp.com/dashboard
<br>
Development: localhost:3000

- Endpoints:
  /dashboard (main homepage)
  /dashboard/?date=2021-08-09 (shows reservations for that specific date- in this case for Aug 9, 2021)
  /reservations (redirects to dashboard)
  /reservations/new (create a new reservation)
  /reservations/:reservation_id/seat (seat a 'booked' reservation to a table)
  /reservations/:reservation_id/edit (edit a specific reservation - can only edit 'booked' reservations)
  /tables/new (create a new table)
  /search (search for past, current, future reservations with matching phone number)
  /otherRoutes (all other routes will display a Not Found page)

#### Back-End

Production: https://restaurant-fullstack-backend.herokuapp.com (There is no endpoint here, so will say "Path not found: /")
Development: localhost:5000 (There is no endpoint here, so will say "Path not found: /")

- Endpoints & CRUDL with RESTful API best practices:
  /reservations (list, create)
  /reservations/:reservation_id (read, update)
  /reservations/:reservation_id/status (update)

  /tables (list, create)
  /tables/:table_id (read)
  /tables/table_id/seat/ (update, delete)

## Context

This project is a monorepo (both client and backend folders under same directory) that was built on my own to demonstrate my knowledge of a full-stack application. Properly routed to the API backend, it does all CRUDL (create, read, update, delete, list) following best RESTful API practices. This project (had a blast creating this), taught me key concepts on how the front-end connects to the back-end, how API calls are made as a request to the backend, and received as a response in the client.

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
      ![today, but later time](/screenshot-imgs/today-later-time.png?raw=true)
   2. /reservations API has same validations as above and returns 400 when validation error occurs

4. asdf

## Tech Stack

HTML, CSS (Flexbox + Bootstrap), JavaScript (ReactJS + Hooks), NodeJS, Express + Knex, PostgreSQL (ElephantSQL, DBeaver) - Deployed via Heroku
