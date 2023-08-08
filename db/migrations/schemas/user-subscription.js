module.exports = (table) => {
  table.increments()
  table.date('start_date')
  table.date('end_date')
  table.boolean('premium')
}
