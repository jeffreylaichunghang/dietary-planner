/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('nutrition_property').del()
  await knex('nutrition_property').insert([
    {
      id: 1,
      property_name: 'fruit',
      ingredient_id: 1,
    },
    {
      id: 2,
      property_name: 'fruit',
      ingredient_id: 2,
    },
    {
      id: 3,
      property_name: 'fruit salad',
      dish_id: 1,
    },
    {
      id: 4,
      property_name: 'meat',
      ingredient_id: 3,
    },
    {
      id: 5,
      property_name: 'chicken',
      ingredient_id: 3,
    },
    {
      id: 6,
      property_name: 'fish',
      ingredient_id: 4,
    },
    {
      id: 7,
      property_name: 'seafood',
      ingredient_id: 4,
    },
    {
      id: 8,
      property_name: 'root vegetable',
      ingredient_id: 5,
    },
    {
      id: 9,
      property_name: 'starchy carbs',
      ingredient_id: 5,
    },
    {
      id: 10,
      property_name: 'root vegetable',
      ingredient_id: 6,
    },
    {
      id: 11,
      property_name: 'carrot',
      ingredient_id: 6,
    },
  ]);
};
