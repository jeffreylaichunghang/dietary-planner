/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('ingredient', require('./schemas/ingredient'))
    .createTable('ingredient_info', require('./schemas/ingredient-info'))
    .createTable('ingredient_cost', require('./schemas/ingredient-cost'))
    .createTable('dish', require('./schemas/dish'))
    .createTable('dish_info', require('./schemas/dish-info'))
    .createTable('dish_cost', require('./schemas/dish-cost'))
    .createTable('ingredient_dish', require('./schemas/ingredient-dish'))
    .createTable('nutrition_property', require('./schemas/nutrition-property'))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('')
};
