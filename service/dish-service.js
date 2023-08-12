const IngredientService = require('./ingredient-service')

class DishService {
  constructor(knex) {
    this.knex = knex
    this.ingredientService = new IngredientService(knex)
  }

  async getDishPage() {
    return await this.knex('dish')
      .join('dish_info', 'dish_info_id', 'dish_info.id')
  }

  async getDishInfo(id) {
    console.log(id)
    return await this.knex('dish')
      .join('ingredient_dish', 'dish.id', 'ingredient_dish.dish_id')
      .join('ingredient', 'ingredient_dish.ingredient_id', 'ingredient.id')
      .join('ingredient_info', 'ingredient.ingredient_info_id', 'ingredient_info.id')
      .join('ingredient_cost', 'ingredient_cost_id', 'ingredient_cost.id')
      .where('dish.id', id)
  }

  async getIngredientInfo() {
    console.log('getting ingredient')
    return await this.knex('ingredient')
      .join('ingredient_info', 'ingredient_info_id', 'ingredient_info.id')
      .join('ingredient_cost', 'ingredient_cost_id', 'ingredient_cost.id')
  }
}

module.exports = DishService
