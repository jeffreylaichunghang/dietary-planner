let scripts = ['/js/main.js', '/js/menu.js']

class MenuRoute {
  constructor(express, service) {
    this.express = express;
    this.service = service;
  }

  route() {
    let router = this.express.Router()

    router.get('/menu', this.showMenu.bind(this))
    router.get('/getMenu', this.getMenu.bind(this))
    router.get('/selectDish', this.getAllDishInfo.bind(this))

    router.post('/updateMenu/:id', this.updateMenu.bind(this))

    return router
  }

  showMenu(req, res) {
    res.render('menus', { script: scripts[1] })
  }

  getMenu(req, res) {
    console.log(req.query)

    let user = 2
    return this.service.getMenu(user, req.query).then((data) => {
      console.log('data: ', data)
      if (data.length == 0) {
        res.render('menus', {
          script: scripts[1],
          id: data[0].id,
          date: req.query.date
        })
        //res.send(data)
      } else {
        res.render('menus', {
          script: scripts[1],
          dishes: data,
          id: data[0].menu_id,
          date: req.query.date
        })
        //res.send(data)
      }
    })
  }

  updateMenu(req, res) {
    console.log(req.params.id)
    console.log(req.body)
    // let user = 2 (only need menu id here)
    return this.service.updateMenu(req.params.id, req.body).then(() => res.redirect(`/getMenu?date=${req.body.date}`))
  }

  getAllDishInfo(req, res) {
    return this.service.getAllDishInfo().then((data) => {
      res.json(data)
    })
  }
}

module.exports = MenuRoute;
