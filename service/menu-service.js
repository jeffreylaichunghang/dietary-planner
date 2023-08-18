class MenuService {
  constructor(knex) {
    this.knex = knex
  }

  async getAllDishInfo() {
    return this.knex('dish')
      .join('dish_info', 'dish.dish_info_id', 'dish_info.id')
      .join('dish_cost', 'dish_cost_id', 'dish_cost.id')
  }

  formatDate(date) {

    const dateParts = date.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }

  async hasMenu(user, date) {
    try {
      return this.knex
        .from('menu')
        .where({
          user_id: user,
          day: date
        })
    } catch (error) {
      console.error(error);
    }
  }

  async getMenu(userId, date) {
    let formatDate = this.formatDate(date.date)
    console.log('formatDate :', formatDate)

    //check if a user has a menu
    const hasMenu = await this.hasMenu(userId, formatDate)
    console.log('has a menu? ', hasMenu)
    if (hasMenu.length == 0) {
      console.log('create menu')
      await this.createMenu(userId, formatDate)
      return await this.hasMenu(userId, formatDate)
    } else {
      console.log('menu already exists')
    }

    //if the user has menu, send it
    try {
      let data = await this.knex
        .from('menu')
        .join('menu_dish', 'menu.id', 'menu_dish.menu_id')
        .join('dish', 'menu_dish.dish_id', 'dish.id')
        .join('dish_info', 'dish.dish_info_id', 'dish_info.id')
        .join('dish_cost', 'dish_cost_id', 'dish_cost.id')
        .where({
          user_id: userId,
          day: formatDate
        })

      return data.length == 0 ? hasMenu : data
    } catch (error) {
      console.error(error);
    }
  }

  async createMenu(userId, date) {
    const id = await this.knex('menu').max('id')

    console.log(id)
    id[0].max++
    try {
      await this.knex('menu')
        .insert({
          id: id[0].max,
          user_id: userId,
          day: date
        })
      await this.knex('menu_info')
        .insert({
          id: id[0].max,
          menu_id: id[0].max
        })
      await this.knex('menu_cost')
        .insert({
          id: id[0].max,
          menu_id: id[0].max
        })
    } catch (error) {
      console.error(error);
    }
  }

  async updateMenu(menuId, data) {
    return this.knex.transaction(async trx => {

      const totalRowValue = Object.values(data.totalRowValue[0]).map(v => Number(v))
      const meals = data.dishList.map(m => m.meal)
      const dishes = data.dishList.map(d => d.dish.trim())
      const portions = data.dishList.map(p => Number(p.portion))

      console.log('total row value :', totalRowValue)
      console.log('meal list :', meals)
      console.log('dish list :', dishes)
      console.log('portion list :', portions)

      //update tables
      try {

        await trx.from('menu_info')
          .where('menu_id', menuId)
          .update({
            portion: totalRowValue[2],
            calories: totalRowValue[3],
            carb: totalRowValue[4],
            protein: totalRowValue[5],
            fat: totalRowValue[6],
            cholesterol: totalRowValue[7],
            trans_fat: totalRowValue[8],
            sat_fat: totalRowValue[9],
            fibre: totalRowValue[10],
            sodium: totalRowValue[11],
            sugar: totalRowValue[12]
          })

        await trx.from('menu_cost')
          .where('menu_id', menuId)
          .update({ cost: totalRowValue[13] })

        const deletedRows = await trx.from('menu_dish')
          .where({ 'menu_id': menuId })
          .del()
        console.log('deletedRow :', deletedRows)

        let id = await trx.from('menu_dish').max('id')
        console.log('max id :', id)
        for (let i = 0; i < meals.length; i++) {
          id[0].max++

          const dishId = await trx.from('dish')
            .where({ 'name': dishes[i] })
            .returning('id')

          await trx.from('menu_dish')
            .insert({
              id: id[0].max,
              dish_portion: portions[i],
              meal: meals[i],
              menu_id: menuId,
              dish_id: dishId[0].id
            })
        }

        return trx.commit();
      } catch (error) {
        console.error(error);
        return trx.rollback();
      }

    })
  }
}

module.exports = MenuService
