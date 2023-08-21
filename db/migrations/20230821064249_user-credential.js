/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .table('user_credential', table => {
      table.setNullable('username');
      table.setNullable('password');
    })
    .table('user', table => {
      table.setNullable('first_name');
      table.setNullable('last_name');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
