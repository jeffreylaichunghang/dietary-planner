const knexfile = require('../db/knexfile').development;
const knex = require('knex')(knexfile);
const axios = require('axios')


async function callApi() {
  try {
    let fooddata = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/list?api_key=8hBOB6WSy1XMg5vgfs3yJIBBOVxphcXdPZsWwfDa&pageSize=50&pageNumber=1&dataType=Branded')
    //console.log(fooddata.data)
    let foodArray = fooddata.data

    return knex.transaction(async trx => {
      let maxId = await trx.from('ingredient').max('id')
      let newId = maxId[0].max + 1
      console.log('max id :', maxId)
      console.log('new id :', newId)

      try {

        for (let i = 5; i < foodArray.length; i++) {
          const foodCode = foodArray[i].foodCode;
          const ingredientName = foodArray[i].description ?? foodCode;
          const calories = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Energy' && c.unitName == 'KCAL')?.amount) || 0;
          const protein = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Protein')?.amount) || 0
          const carb = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Carbohydrate, by difference')?.amount) || 0
          const fat = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Total lipid (fat)')?.amount) || 0
          const cholesterol = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Cholesterol')?.amount) || 0;
          const trans_fat = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Fatty acids, total trans')?.amount) || 0;
          const sat_fat = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Fatty acids, total saturated')?.amount) || 0;
          const fibre = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Fiber, total dietary')?.amount) || 0;
          const sodium = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Sodium, Na')?.amount) || 0;
          const sugar = parseFloat(foodArray[i].foodNutrients.find(c => c.name == 'Sugars, total including NLEA')?.amount) || 0;

          await trx.from('ingredient_cost')
            .insert({ id: newId, cost: 0 })

          await trx.from('ingredient_info')
            .insert({
              id: newId,
              calories: calories,
              carb: carb,
              protein: protein,
              fat: fat,
              cholesterol: cholesterol,
              sat_fat: sat_fat,
              trans_fat: trans_fat,
              fibre: fibre,
              sodium: sodium,
              sugar: sugar
            })

          await trx.from('ingredient')
            .insert({
              id: newId,
              ingredient_name: ingredientName,
              ingredient_info_id: newId,
              ingredient_cost_id: newId
            })

          newId++
        }

        return trx.commit();
      } catch (error) {
        console.error(error);
        return trx.rollback();
      }
    })

  } catch (error) {
    console.error(error);
  }
}

callApi()

'https://api.nal.usda.gov/fdc/v1/foods/list?api_key=8hBOB6WSy1XMg5vgfs3yJIBBOVxphcXdPZsWwfDa&pageSize=50&pageNumber=1'
