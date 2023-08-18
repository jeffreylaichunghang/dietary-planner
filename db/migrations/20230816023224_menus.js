/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('menu_info', require('./schemas/menu-info'))
    .createTable('menu_cost', require('./schemas/menu-cost'))
    .alterTable('menu', table => {
      table.date('day')
      table.dropUnique('user_id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('menu', table => {
      table.dropColumn('day')
      // table.unique('user_id')
    })
    .dropTable('menu_cost')
    .dropTable('menu_info')
};
