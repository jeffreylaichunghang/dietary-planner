module.exports = (table) => {
  table.increments()
  table.integer('cost')
  table.string('wholesaler')
}
