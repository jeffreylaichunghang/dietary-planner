class Service {
  constructor(knex) {
    this.knex = knex
  }

  async getIngredientPage() {
    return await this.knex('ingredient')
      .join('ingredient_info', 'ingredient_info_id', 'ingredient_info.id')
  }

  async getIngredient(id) {
    return await this.knex('ingredient')
      .join('ingredient_info', 'ingredient_info_id', 'ingredient_info.id')
      .where('ingredient.id', id)
  }

  async deleteIngredient(id) {
    return await this.knex.transaction(trx => {
      try {
        return trx
          .from('nutrition_property')
          .where('ingredient_id', id)
          .del()
          .then(() => {
            return trx
              .from('ingredient_dish')
              .where('ingredient_id', id)
              .del()
          })
          .then(() => {
            return trx
              .from('ingredient')
              .where('ingredient.id', id)
              .del()
          })
          .then(() => {
            return trx
              .from('ingredient_cost')
              .where('ingredient_cost.id', id)
              .del()
          })
          .then(() => {
            return trx
              .from('ingredient_info')
              .where('ingredient_info.id', id)
              .del()
          })
          .then(() => {
            trx.commit;
          })
      } catch (error) {
        return trx.rollback;
      }
    })
  }
}

module.exports = Service
