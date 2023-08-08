module.exports = (table) => {
  table.increments()
  table.string('username').notNullable()
  table.string('password').notNullable()
  table.string('access_token')
  table.integer('facebook_id')
  table.integer('google_id')
  table.integer('instagram_id')
  table.integer('twitter_id')
  table.integer('apple_id')
}
