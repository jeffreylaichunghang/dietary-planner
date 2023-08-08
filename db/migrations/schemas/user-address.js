module.exports = (table) => {
  table.increments()
  table.string('flat')
  table.integer('floor')
  table.string('block')
  table.string('building')
  table.string('street_name')
  table.integer('street_number')
  table.string('district')
  table.string('city')
  table.string('state')
  table.string('country')
}
