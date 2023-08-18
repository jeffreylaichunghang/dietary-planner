/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('menu_dish').del()
  await knex('menu_dish').insert([
    {
      id: 1,
      dish_portion: 250,
      meal: 'snack',
      menu_id: 1,
      dish_id: 1,
    },
    {
      id: 2,
      dish_portion: 200,
      meal: 'lunch',
      menu_id: 1,
      dish_id: 2,
    },
    {
      id: 3,
      dish_portion: 150,
      meal: 'lunch',
      menu_id: 1,
      dish_id: 5,
    },
    {
      id: 4,
      dish_portion: 200,
      meal: 'dinner',
      menu_id: 1,
      dish_id: 3,
    },
    {
      id: 5,
      dish_portion: 100,
      meal: 'dinner',
      menu_id: 1,
      dish_id: 4,
    },
    {
      id: 6,
      dish_portion: 300,
      meal: 'snack',
      menu_id: 2,
      dish_id: 1,
    },
    {
      id: 7,
      dish_portion: 250,
      meal: 'lunch',
      menu_id: 2,
      dish_id: 2,
    },
    {
      id: 8,
      dish_portion: 250,
      meal: 'lunch',
      menu_id: 2,
      dish_id: 4,
    },
    {
      id: 9,
      dish_portion: 150,
      meal: 'dinner',
      menu_id: 2,
      dish_id: 3,
    },
    {
      id: 10,
      dish_portion: 200,
      meal: 'dinner',
      menu_id: 2,
      dish_id: 5,
    },
  ]);
};
