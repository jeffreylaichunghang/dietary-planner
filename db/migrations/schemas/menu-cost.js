module.exports = (table) => {
  table.increments()
  table.decimal('cost')
  table.integer('menu_id').unsigned()
  table.foreign('menu_id').references('menu.id')
}
