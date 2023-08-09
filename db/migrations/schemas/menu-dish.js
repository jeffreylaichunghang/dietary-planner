module.exports = (table) => {
  table.increments()
  table.decimal('dish_portion').notNullable()
  table.string('meal')
  table.integer('menu_id').unsigned()
  table.foreign('menu_id').references('menu.id')
  table.integer('dish_id').unsigned()
  table.foreign('dish_id').references('dish.id')
}
