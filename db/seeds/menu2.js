/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('menu_info').del()
  await knex('menu_cost').del()
  await knex('menu')
    .where('user_id', 1)
    .update(
      { day: null }
    )
  await knex('menu')
    .where('user_id', 2)
    .update(
      { day: null }
    )
  await knex('menu_info').insert([
    {
      id: 1,
      menu_id: 1,
    },
    {
      id: 2,
      menu_id: 2,
    },
  ]);
  await knex('menu_cost').insert([
    { id: 1, menu_id: 1 },
    { id: 2, menu_id: 2 },
  ]);
  await knex('menu')
    .where('user_id', 1)
    .update(
      { day: '08/17/2023' }
    )
  await knex('menu')
    .where('user_id', 2)
    .update(
      { day: '08/15/2023' }
    )
};
