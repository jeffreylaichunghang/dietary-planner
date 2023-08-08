module.exports = (table) => {
  table.increments();
  table.timestamps(false, true);
  table.string('ingredient_name').notNullable();
  table.integer('ingredient_info_id').unsigned().unique();
  table.foreign('ingredient_info_id').references('ingredient_info.id');
  table.integer('ingredient_cost_id').unsigned();
  table.foreign('ingredient_cost_id').references('ingredient_cost.id');
}
