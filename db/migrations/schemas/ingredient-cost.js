module.exports = (table) => {
  table.increments()
  table.decimal('cost')
  table.string('wholesaler')
}
