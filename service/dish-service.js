const IngredientService = require('./ingredient-service')

class DishService {
  constructor(knex) {
    this.knex = knex
    this.pagination = new IngredientService(knex).pagination
  }

  async getDishPage(page) {
    let data = await this.knex('dish')
      .join('dish_info', 'dish_info_id', 'dish_info.id')

    return this.pagination(page, data)
  }

  async getDishInfo(id) {
    console.log(id)
    let dish = await this.knex('dish')
      .join('ingredient_dish', 'dish.id', 'ingredient_dish.dish_id')
      .join('ingredient', 'ingredient_dish.ingredient_id', 'ingredient.id')
      .join('ingredient_info', 'ingredient.ingredient_info_id', 'ingredient_info.id')
      .join('ingredient_cost', 'ingredient_cost_id', 'ingredient_cost.id')
      .where('dish.id', id)

    let newAddedDish = await this.knex('dish')
      .where('id', id)

    return dish.length == 0 ? newAddedDish : dish;
  }

  async getIngredientInfo() {
    console.log('getting ingredient')
    return await this.knex('ingredient')
      .join('ingredient_info', 'ingredient_info_id', 'ingredient_info.id')
      .join('ingredient_cost', 'ingredient_cost_id', 'ingredient_cost.id')
  }

  async updateDish(data, id) {
    return this.knex.transaction(async trx => {

      let ingredientName = []
      let ingredientPortion = []
      let ingredientUnit = []
      data.ingredientList.forEach((i) => ingredientName.push(Object.values(i)[0].trim()))
      data.ingredientList.forEach((p) => ingredientPortion.push(Number(Object.values(p)[1])))
      data.ingredientList.forEach((u) => ingredientUnit.push(Object.values(u)[2].trim()))
      ingredientUnit.forEach((s, i) => ingredientUnit[i] = s.replace(/[0-9.]/g, '').trim())
      const dataValue = Object.values(data.totalRowValue[0]).map((v) => Number(v))

      try {
        await this.getDishInfo(id).then(async function (data) {
          //delete old data from join table
          let ingredientIds = []
          if (data[0].ingredient_id) {
            data.forEach(d => ingredientIds.push(d['ingredient_id']))
          }
          console.log('old ingredientIds :', ingredientIds)
          console.log('data', data)


          if (ingredientIds && ingredientIds.length > 0) {
            console.log('deleting old ingredients')
            for (const iId of ingredientIds) {
              await trx.from('ingredient_dish').where({
                dish_id: id,
                ingredient_id: iId
              }).del();
            }
          }

          return await trx.from('ingredient_dish').max('id')
        })
          .then(async function (iId) {
            console.log('ingredientName :', ingredientName)
            console.log('ingredientPortion :', ingredientPortion)
            console.log('ingredient Unit :', ingredientUnit)
            console.log('max id :', iId)
            let ingredientIds = []

            try {
              for (const name of ingredientName) {
                let ingreId = await trx('ingredient').select('ingredient.id').where('ingredient_name', name)
                console.log(ingreId)
                ingredientIds.push(ingreId[0]['id'])
              }
            } catch (error) {
              console.error('An error occurred:', error);
              trx.rollback();
              return
            }
            console.log('new ingredientIds :', ingredientIds)

            try {
              for (let i = 0; i < ingredientName.length; i++) {
                iId[0].max++
                await trx('ingredient_dish').insert({
                  id: iId[0].max,
                  unit: ingredientUnit[i],
                  ingredient_portion: ingredientPortion[i],
                  ingredient_id: ingredientIds[i],
                  dish_id: id
                })
              }
              console.log('processing')
            } catch (error) {
              console.error('An error occurred:', error);
              trx.rollback();
              return
            }
          }).then(async function () {
            console.log('dataValue :', dataValue)

            try {

              await trx
                .from('dish_info')
                .where('id', id)
                .update({
                  calories: dataValue[3],
                  carb: dataValue[4],
                  protein: dataValue[5],
                  fat: dataValue[6],
                  cholesterol: dataValue[7],
                  trans_fat: dataValue[8],
                  sat_fat: dataValue[9],
                  fibre: dataValue[10],
                  sodium: dataValue[11],
                  sugar: dataValue[12]
                })
                .whereIn(
                  'id',
                  trx('dish')
                    .select('dish_info_id')
                    .where('id', id)
                )
                .then(async function () {
                  await trx
                    .from('dish_cost')
                    .where('id', id)
                    .update({
                      cost: dataValue[13]
                    })
                    .whereIn(
                      'id',
                      trx('dish')
                        .select('dish_cost_id')
                        .where('id', id)
                    )
                })
            } catch (error) {
              console.error('An error occurred:', error);
              trx.rollback()
              return
            }
          })
          .then(function () {
            console.log('ready to commit')
            return trx.commit();
          })
      } catch (error) {
        return trx.rollback();
      }
    })
  }

  async addDish(name) {
    if (name.length == 0 || !name) return 'wrong input'

    return this.knex.transaction(async trx => {
      try {
        // get the largest id
        let id = await trx
          .from('dish')
          .max('id')

        id[0].max++
        return trx
          .from('dish_cost')
          .insert({
            id: id[0].max,
            cost: 0
          })
          .then(() => {
            return trx
              .from('dish_info')
              .insert({
                id: id[0].max,
                calories: 0,
                carb: 0,
                protein: 0,
                fat: 0
              })
          })
          .then(() => {
            return trx
              .from('dish')
              .insert({
                id: id[0].max,
                name: name,
                dish_info_id: id[0].max,
                dish_cost_id: id[0].max
              })
          })
          .then(() => {
            return trx.commit()
          })
      } catch (error) {
        console.error('error :', error)
        trx.rollback()
      }
    })
  }

  async deleteDish(id) {
    return this.knex.transaction(async trx => {
      try {
        // check if it exists in any menu
        let menu = await trx
          .from('menu_dish')
          .where({ 'dish_id': id })
        if (menu.length !== 0) {
          console.log('dish cannot be deleted', menu)
          return menu
        }

        await trx
          .from('ingredient_dish')
          .where({ 'dish_id': id })
          .del()

        await trx
          .from('nutrition_property')
          .where({ 'dish_id': id })
          .del()

        await trx
          .from('dish')
          .where({
            'id': id,
            'dish_cost_id': id,
            'dish_info_id': id
          })
          .del()

        await trx
          .from('dish_cost')
          .where({ 'id': id })
          .del()

        await trx
          .from('dish_info')
          .where({ 'id': id })
          .del()

        return trx.commit()
      } catch (error) {
        console.error(error);
        trx.rollback();
        return
      }
    })
  }
}

module.exports = DishService
