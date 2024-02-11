let scripts = ['/js/main.js', '/js/menu.js']
const { isLoggedIn } = require('../utilities/middleware')

class MenuRoute {
  constructor(express, service) {
    this.express = express;
    this.service = service;
    this.user;
  }

  route() {
    let router = this.express.Router()

    router.get('/menu', isLoggedIn, this.showMenu.bind(this))
    router.get('/getMenu', isLoggedIn, this.getMenu.bind(this))
    router.get('/selectDish', isLoggedIn, this.getAllDishInfo.bind(this))

    router.post('/updateMenu/:id', this.updateMenu.bind(this))

    return router
  }

  showMenu(req, res) {
    console.log('user :', req.user)
    this.user = req.user
    res.render('menus', {
      script: scripts[1],
      user: this.user
    })
  }

  getMenu(req, res) {
    console.log(req.query)

    if (!req.query.date) {
      return res.render('menus', {
        script: scripts[1],
        user: this.user,
        id: null,
        date: null,
        dishes: null,
        message: 'Please pick a date'
      })
    }

    return this.service.getMenu(this.user.id, req.query).then((data) => {
      console.log('data: ', data)
      if (!data[0].menu_id) {
        res.render('menus', {
          script: scripts[1],
          id: data[0].id,
          date: req.query.date,
          user: this.user
        })
        //res.send(data)
      } else {
        res.render('menus', {
          script: scripts[1],
          dishes: data,
          id: data[0].menu_id,
          date: req.query.date,
          user: this.user
        })
        //res.send(data)
      }
    })
  }

  updateMenu(req, res) {
    console.log(req.params.id)
    console.log(req.body)

    return this.service.updateMenu(req.params.id, req.body).then(() => res.redirect(`/getMenu?date=${req.body.date}`))
  }

  getAllDishInfo(req, res) {
    return this.service.getAllDishInfo().then((data) => {
      res.json(data)
    })
  }
}

module.exports = MenuRoute;
