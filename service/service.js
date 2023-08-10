class Service {
  constructor(knex) {
    this.knex = knex
  }

  async checkDuplicate(name, table) {
    let exist = await this.knex(table)
      .first('ingredient_name', name)
    if (exist) {
      throw new error('ingredient already exists')
    } else if (!exist) {
      console.log('good to go')
    }
  }

  async returnId(table) {
    let largestId = await this.knex(table)
      .max('id')
    console.log(largestId)
    return largestId
  }

  async getIngredientPage() {
    return await this.knex('ingredient')
      .join('ingredient_info', 'ingredient_info_id', 'ingredient_info.id')
  }

  async getIngredient(id) {
    return await this.knex('ingredient')
      .join('ingredient_info', 'ingredient_info_id', 'ingredient_info.id')
      .join('ingredient_cost', 'ingredient_cost_id', 'ingredient_cost.id')
      .where('ingredient.id', id)
  }

  async addIngredient(ingredient) {
    const { name, carb, protein, fat } = ingredient

    // validate if the ingredient already exists
    //await this.checkDuplicate(name, 'ingredient')
    let newId = await this.returnId('ingredient')
    newId[0].max++
    console.log(newId)
    let calories = Number(carb) * 4 + Number(protein) * 4 + Number(fat) * 9
    if (!calories) return 'cannot get calories'
    console.log(calories)
    return await this.knex.transaction(trx => {
      try {
        return trx
          .insert({
            id: newId[0].max,
            calories: calories,
            carb: Number(carb),
            protein: Number(protein),
            fat: Number(fat)
          })
          .into('ingredient_info')
          .then(() => {
            return trx
              .insert({
                id: newId[0].max,
                cost: 0
              })
              .into('ingredient_cost')
          })
          .then(() => {
            return trx
              .insert({
                id: newId[0].max,
                ingredient_name: name,
                ingredient_info_id: newId[0].max,
                ingredient_cost_id: newId[0].max
              })
              .into('ingredient')
          })
          .then((id) => {
            console.log(`new ingredient created, id: ${id}`)
            return trx.commit;
          })
      } catch (error) {
        return trx.rollback;
      }
    })
  }

  async updateIngredient(data, id) {
    const { calories, carb, protein, fat, cholesterol, trans_fat, sat_fat, fibre, sodium, sugar, cost, wholesaler } = data

    return await this.knex.transaction(trx => {
      try {
        return trx
          .from('ingredient_info')
          .where('ingredient_info.id', id)
          .update({
            calories: calories,
            carb: carb,
            protein: protein,
            fat: fat,
            cholesterol: cholesterol,
            trans_fat: trans_fat,
            sat_fat: sat_fat,
            fibre: fibre,
            sodium: sodium,
            sugar: sugar,
          })
          .then(() => {
            return trx
              .from('ingredient_cost')
              .where('ingredient_cost.id', id)
              .update({
                cost: cost,
                wholesaler: wholesaler
              })
          })
          .then(() => {
            return trx.commit;
          })
      } catch (error) {
        return trx.rollback
      }
    })
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
