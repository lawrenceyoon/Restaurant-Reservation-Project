# Restaurant Reservation Project

A full-stack application built for owners who want to manage their reservations and tables at their restaurant.

## Deployed Links / development Links

### Production Links:

#### Front-End

https://restaurant-fullstack-frontend.herokuapp.com/dashboard

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

https://restaurant-fullstack-backend.herokuapp.com/tables

### Development:

on main dir, run => npm run start:dev (starts up both the front-end and back-end)

#### Front-End

localhost:3000

#### Back-End

localhost:5000

## Context

This project is a monorepo (both client and backend folders under same directory) that was built on my own to demonstrate my knowledge of a full-stack application. Properly routed to the API backend, it does all CRUDL (create, read, update, delete, list) following best RESTful API practices. This project (had a blast creating this), taught me key concepts on how the front-end connects to the back-end, how API calls are made as a request to the backend, and received as a response in the client.

I made 8 user stories, based on what a real world project would be like. Here are my listed steps:

<ul>
    <li></li>
<ul>

## Tech Stack

HTML, CSS (Flexbox + Bootstrap), JavaScript (ReactJS + Hooks), NodeJS, Express + Knex, PostgreSQL (ElephantSQL, DBeaver) - Deployed via Heroku
