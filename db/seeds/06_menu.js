/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('menu').del()
  await knex('menu').insert([
    {
      id: 1,
      cost: 100,
      user_id: 1,
    },
    {
      id: 2,
      cost: 110,
      user_id: 2,
    },
  ]);
};
