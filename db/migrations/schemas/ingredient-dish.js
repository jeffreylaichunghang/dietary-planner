module.exports = (table) => {
  table.increments()
  table.enu('unit', ['serving', 'ounce', 'gram', 'millimeter', 'litres', 'pound', 'teaspoon', 'tablespoon', 'cup']).notNullable()
  table.integer('ingredient_id').unsigned().notNullable()
  table.foreign('ingredient_id').references('ingredient.id')
  table.integer('dish_id').unsigned().notNullable()
  table.foreign('dish_id').references('dish.id')
}
