/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('ingredient_info', require('./schemas/ingredient-info'))
    .createTable('ingredient_cost', require('./schemas/ingredient-cost'))
    .createTable('ingredient', require('./schemas/ingredient'))
    .createTable('dish_info', require('./schemas/dish-info'))
    .createTable('dish_cost', require('./schemas/dish-cost'))
    .createTable('dish', require('./schemas/dish'))
    .createTable('ingredient_dish', require('./schemas/ingredient-dish'))
    .createTable('nutrition_property', require('./schemas/nutrition-property'))
    .createTable('user_credential', require('./schemas/user-credential'))
    .createTable('user_address', require('./schemas/user-address'))
    .createTable('user_subscription', require('./schemas/user-subscription'))
    .createTable('user_info', require('./schemas/user-info'))
    .createTable('user', require('./schemas/user'))
    .createTable('menu', require('./schemas/menu'))
    .createTable('menu_dish', require('./schemas/menu-dish'))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('user_info')
    .dropTable('user_subscription')
    .dropTable('user_address')
    .dropTable('user_credential')
    .dropTable('user')
    .dropTable('menu_dish')
    .dropTable('nutrition_property')
    .dropTable('menu')
    .dropTable('ingredient_dish')
    .dropTable('dish_cost')
    .dropTable('dish_info')
    .dropTable('dish')
    .dropTable('ingredient_cost')
    .dropTable('ingredient_info')
    .dropTable('ingredient')
};
