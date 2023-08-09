module.exports = (table) => {
  table.increments();
  table.timestamps(false, true)
  table.decimal('calories').notNullable()
  table.decimal('carb').notNullable()
  table.decimal('protein').notNullable()
  table.decimal('fat').notNullable()
  table.decimal('cholesterol')
  table.decimal('trans_fat')
  table.decimal('sat_fat')
  table.decimal('fibre')
  table.decimal('sodium')
  table.decimal('sugar')
}
