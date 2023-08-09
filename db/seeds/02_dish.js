/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('dish_info').del()
  await knex('dish_cost').del()
  await knex('dish').del()
  await knex('dish_info').insert([
    {
      id: 1,
      calories: 117,
      carb: 27.4,
      protein: 1.06,
      fat: 0.31,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 0,
      fibre: 4.1,
      sodium: 10,
      sugar: 21.87,
    },
    {
      id: 2,
      calories: 406,
      carb: 0,
      protein: 64.2,
      fat: 16.1,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 1.5,
      fibre: 0,
      sodium: 94,
      sugar: 0,
    },
    {
      id: 3,
      calories: 416,
      carb: 0,
      protein: 40,
      fat: 26,
      cholesterol: 110,
      trans_fat: 0,
      sat_fat: 0,
      fibre: 0,
      sodium: 2118,
      sugar: 0,
    },
    {
      id: 4,
      calories: 244,
      carb: 27.4,
      protein: 4,
      fat: 10.2,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 1.5,
      fibre: 4.1,
      sodium: 2012,
      sugar: 1.64,
    },
    {
      id: 5,
      calories: 106.5,
      carb: 13.62,
      protein: 1.6,
      fat: 5.21,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 0.75,
      fibre: 4.05,
      sodium: 2000,
      sugar: 0,
    },
  ]);
  await knex('dish_cost').insert([
    { id: 1, cost: 9 },
    { id: 2, cost: 40.1 },
    { id: 3, cost: 60 },
    { id: 4, cost: 7.5 },
    { id: 5, cost: 14.2 },
  ]);
  await knex('dish').insert([
    {
      id: 1,
      name: 'fruit salad',
      dish_info_id: 1,
      dish_cost_id: 1
    },
    {
      id: 2,
      name: 'roasted chicken breast',
      dish_info_id: 2,
      dish_cost_id: 2
    },
    {
      id: 3,
      name: 'steamed salmon',
      dish_info_id: 3,
      dish_cost_id: 3
    },
    {
      id: 4,
      name: 'mashed potato',
      dish_info_id: 4,
      dish_cost_id: 4
    },
    {
      id: 5,
      name: 'roasted baby carrot',
      dish_info_id: 5,
      dish_cost_id: 5
    },
  ]);
};
