module.exports = (table) => {
  table.increments();
  table.timestamps(false, true)
  table.integer('calories').notNullable()
  table.integer('carb').notNullable()
  table.integer('protein').notNullable()
  table.integer('fat').notNullable()
  table.integer('cholesterol')
  table.integer('trans_fat')
  table.integer('sat_fat')
  table.integer('fibre')
  table.integer('sodium')
  table.integer('sugar')
}
