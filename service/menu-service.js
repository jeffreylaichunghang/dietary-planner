class MenuService {
  constructor(knex) {
    this.knex = knex
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
    return this.knex
      .from('menu')
      .where({
        user_id: user,
        day: date
      })
  }

  async getMenu(userId, date) {
    let formatDate = this.formatDate(date.date)
    console.log('formatDate :', formatDate)

    //check if a user has a menu
    const hasMenu = await this.hasMenu(userId, formatDate)
    console.log('has a menu? ', hasMenu)
    if (hasMenu.length == 0) {
      return hasMenu
    }

    //if the user has menu, send it
  }
}

module.exports = MenuService
