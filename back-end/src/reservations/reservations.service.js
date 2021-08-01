const knex = require('../db/connection');
const tableName = 'reservations';

function create(reservation) {
  return knex(tableName)
    .insert(reservation)
    .returning('*')
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex(tableName).select('*').where({ reservation_id }).first();
}

function update(reservation_id, status) {
  return knex(tableName)
    .where({ reservation_id })
    .update(status, '*')
    .then((createdRecords) => createdRecords[0]);
}

function list(reservation_date) {
  if (!reservation_date) {
    return knex(tableName)
      .select('*')
      .orderBy('reservation_date', 'asc')
      .orderBy('reservation_time', 'asc')
      .where({ status: 'booked' })
      .orWhere({ status: 'seated' });
  } else {
    return knex(tableName)
      .select('*')
      .orderBy('reservation_time', 'asc')
      .where('reservation_date', reservation_date)
      .andWhere({ status: 'booked' })
      .orWhere({ status: 'seated' });
  }
}

module.exports = {
  create,
  read,
  update,
  list,
};
