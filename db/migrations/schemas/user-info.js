module.exports = (table) => {
  table.increments()
  table.string('email')
  table.bigint('phone_number')
  table.string('sex')
}
