module.exports = (table) => {
  table.increments()
  table.integer('dish_portion').notNullable()
  table.integer('menu_id').unsigned()
  table.foreign('menu_id').references('menu.id')
  table.integer('dish_id').unsigned()
  table.foreign('dish_id').references('dish.id')
}
