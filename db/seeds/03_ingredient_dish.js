/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('ingredient_dish').del()
  await knex('ingredient_dish').insert([
    {
      id: 1,
      unit: 'gram',
      ingredient_portion: 100,
      ingredient_id: 1,
      dish_id: 1,
    },
    {
      id: 2,
      unit: 'gram',
      ingredient_portion: 100,
      ingredient_id: 2,
      dish_id: 1,
    },
    {
      id: 3,
      unit: 'gram',
      ingredient_portion: 200,
      ingredient_id: 3,
      dish_id: 2,
    },
    {
      id: 4,
      unit: 'gram',
      ingredient_portion: 10,
      ingredient_id: 7,
      dish_id: 2,
    },
    {
      id: 5,
      unit: 'gram',
      ingredient_portion: 200,
      ingredient_id: 4,
      dish_id: 3,
    },
    {
      id: 6,
      unit: 'gram',
      ingredient_portion: 5,
      ingredient_id: 8,
      dish_id: 3,
    },
    {
      id: 7,
      unit: 'gram',
      ingredient_portion: 200,
      ingredient_id: 4,
      dish_id: 4,
    },
    {
      id: 8,
      unit: 'gram',
      ingredient_portion: 10,
      ingredient_id: 7,
      dish_id: 4,
    },
    {
      id: 9,
      unit: 'gram',
      ingredient_portion: 5,
      ingredient_id: 8,
      dish_id: 4,
    },
    {
      id: 10,
      unit: 'gram',
      ingredient_portion: 150,
      ingredient_id: 6,
      dish_id: 5,
    },
    {
      id: 11,
      unit: 'gram',
      ingredient_portion: 5,
      ingredient_id: 7,
      dish_id: 5,
    },
    {
      id: 12,
      unit: 'gram',
      ingredient_portion: 5,
      ingredient_id: 8,
      dish_id: 5,
    },
  ]);
};
