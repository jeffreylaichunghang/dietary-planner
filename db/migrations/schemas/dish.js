module.exports = (table) => {
  table.increments()
  table.string('name').notNullable()
  table.timestamps(false, true)
  table.integer('dish_info_id').unsigned().unique()
  table.foreign('dish_info_id').references('dish_info.id')
  table.integer('dish_cost_id').unsigned().unique()
  table.foreign('dish_cost_id').references('dish_cost.id')
}
