module.exports = (table) => {
  table.increments()
  table.string('property_name')
  table.integer('ingredient_id').unsigned()
  table.foreign('ingredient_id').references('ingredient.id')
  table.integer('dish_id').unsigned()
  table.foreign('dish_id').references('dish.id')
}
