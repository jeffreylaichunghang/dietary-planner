module.exports = (table) => {
  table.increments()
  table.string('email')
  table.integer('phone_number')
  table.string('sex')
}
