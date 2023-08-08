module.exports = (table) => {
  table.increments()
  table.timestamps(false, true)
  table.integer('cost')
  table.integer('user_id').unsigned().unique()
  table.foreign('user_id').references('user.id')
}
