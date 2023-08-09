/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('ingredient_info').del()
  await knex('ingredient_cost').del()
  await knex('ingredient').del()
  await knex('ingredient_info').insert([
    {
      id: 1,
      calories: 65,
      carb: 15.6,
      protein: 0.15,
      fat: 0.16,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 0,
      fibre: 2.1,
      sodium: 1,
      sugar: 13.3
    },
    {
      id: 2,
      calories: 52,
      carb: 11.8,
      protein: 0.91,
      fat: 0.15,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 0,
      fibre: 2,
      sodium: 9,
      sugar: 8.57
    },
    {
      id: 3,
      calories: 158,
      carb: 0,
      protein: 32.1,
      fat: 3.05,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 0,
      fibre: 0,
      sodium: 47,
      sugar: 0
    },
    {
      id: 4,
      calories: 208,
      carb: 0,
      protein: 20,
      fat: 13,
      cholesterol: 55,
      trans_fat: 0,
      sat_fat: 3.1,
      fibre: 0,
      sodium: 59,
      sugar: 0
    },
    {
      id: 5,
      calories: 77,
      carb: 17,
      protein: 2,
      fat: 0.1,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 0,
      fibre: 2.1,
      sodium: 6,
      sugar: 0.82
    },
    {
      id: 6,
      calories: 41,
      carb: 9.08,
      protein: 0.8,
      fat: 0.14,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 0,
      fibre: 2.7,
      sodium: 63,
      sugar: 0
    },
    {
      id: 7,
      calories: 900,
      carb: 0,
      protein: 0,
      fat: 100,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 15,
      fibre: 0,
      sodium: 0,
      sugar: 0
    },
    {
      id: 8,
      calories: 0,
      carb: 0,
      protein: 0,
      fat: 0,
      cholesterol: 0,
      trans_fat: 0,
      sat_fat: 0,
      fibre: 0,
      sodium: 40000,
      sugar: 0
    },
  ]);
  await knex('ingredient_cost').insert([
    {
      id: 1,
      cost: 5,
      wholesaler: 'Wellcome'
    },
    {
      id: 2,
      cost: 4,
      wholesaler: 'Wellcome'
    },
    {
      id: 3,
      cost: 20,
      wholesaler: 'Jason'
    },
    {
      id: 4,
      cost: 30,
      wholesaler: 'Citysuper'
    },
    {
      id: 5,
      cost: 5,
      wholesaler: 'Wet Market'
    },
    {
      id: 6,
      cost: 7,
      wholesaler: 'Wet Market'
    },
    {
      id: 7,
      cost: 1,
      wholesaler: "",
    },
    {
      id: 8,
      cost: 0.5,
      wholesaler: 'Wellcome'
    },
  ]);
  await knex('ingredient').insert([
    {
      id: 1,
      ingredient_name: 'apple',
      ingredient_info_id: 1,
      ingredient_cost_id: 1
    },
    {
      id: 2,
      ingredient_name: 'orange',
      ingredient_info_id: 2,
      ingredient_cost_id: 2
    },
    {
      id: 3,
      ingredient_name: 'chicken breast',
      ingredient_info_id: 3,
      ingredient_cost_id: 3
    },
    {
      id: 4,
      ingredient_name: 'salmon fillet',
      ingredient_info_id: 4,
      ingredient_cost_id: 4
    },
    {
      id: 5,
      ingredient_name: 'potato',
      ingredient_info_id: 5,
      ingredient_cost_id: 5
    },
    {
      id: 6,
      ingredient_name: 'baby carrot',
      ingredient_info_id: 6,
      ingredient_cost_id: 6
    },
    {
      id: 7,
      ingredient_name: 'extra virgin olive oil',
      ingredient_info_id: 7,
      ingredient_cost_id: 7
    },
    {
      id: 8,
      ingredient_name: 'salt',
      ingredient_info_id: 8,
      ingredient_cost_id: 8
    },
  ]);
};
