/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable('user_credential', table => {
      table.string('google_id').alter()
      table.string('facebook_id').alter()
      table.string('twitter_id').alter()
      table.string('instagram_id').alter()
      table.string('apple_id').alter()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('user_credential', table => {
      table.integer('google_id').alter()
      table.integer('facebook_id').alter()
      table.integer('twitter_id').alter()
      table.integer('instagram_id').alter()
      table.integer('apple_id').alter()
    })
};
