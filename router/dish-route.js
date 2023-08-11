let scripts = ['/js/main.js']

class DishRoute {
  constructor(express, service) {
    this.express = express;
    this.service = service;
  }

  route() {
    const router = this.express.Router()

    router.get('/dish', this.getDishPage.bind(this))
    router.get('/dish/:id', this.getDishInfo.bind(this))

    return router
  }

  getDishPage(req, res) {
    return this.service.getDishPage().then((data) => {
      //res.send(data)
      res.render('dishes', {
        script: scripts,
        dish: data
      })
    })
  }

  getDishInfo(req, res) {
    return this.service.getDishInfo(req.params.id).then((data) => {
      console.log(`data ${req.params.id} retrieved: ${data}`)
      //res.send(data)
      res.render('dish', {
        script: scripts,
        ingredients: data,
        name: data[0].name
      })
    })
  }
}

module.exports = DishRoute
