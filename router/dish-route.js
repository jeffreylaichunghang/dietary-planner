let scripts = ['/js/main.js']
const { isLoggedIn } = require('../utilities/middleware')

class DishRoute {
  constructor(express, service) {
    this.express = express;
    this.service = service;
  }

  route() {
    const router = this.express.Router()

    router.get('/dish', this.getDishPage.bind(this))
    router.get('/dish/:id', isLoggedIn, this.getDishInfo.bind(this))
    router.get('/selectIngredient', isLoggedIn, this.getAllIngredient.bind(this))
    router.put('/updateDish/:id', this.updateDish.bind(this))
    router.post('/addDish', this.addDish.bind(this))
    router.delete('/deleteDish/:id', this.deleteDish.bind(this))

    return router
  }

  getDishPage(req, res) {
    let page = req.query.page
    return this.service.getDishPage(page).then((data) => {
      //res.send(data)
      console.log('dish data :', data)
      res.render('dishes', {
        script: scripts,
        limit: data.limit,
        previous: data.previous,
        thisPage: data.thisPage,
        next: data.next,
        dish: data
      })
    })
  }

  getDishInfo(req, res) {
    return this.service.getDishInfo(req.params.id).then((data) => {
      console.log(`data ${req.params.id} retrieved: ${data}`)
      //res.send(data)
      if (data[0].ingredient_name === undefined) {
        res.render('dish', {
          script: scripts,
          name: data[0].name,
          id: data[0].id
        })
      } else {
        res.render('dish', {
          script: scripts,
          ingredients: data,
          name: data[0].name,
          id: data[0].dish_id
        })
      }
    })
  }

  getAllIngredient(req, res) {
    console.log('request recieved')
    return this.service.getIngredientInfo().then((data) => {
      //console.log(data)
      res.json(data)
    })
  }

  updateDish(req, res) {
    console.log(req.body)
    console.log(req.params.id)
    return this.service.updateDish(req.body, req.params.id).then(() => {
      console.log('dish updated')
      res.redirect(`/dish/${req.params.id}`)
    })
  }

  addDish(req, res) {
    console.log(req.body.name)
    return this.service.addDish(req.body.name).then((data) => {
      console.log('new dish added ', data)
      res.redirect('/dish')
    })
  }

  deleteDish(req, res) {
    console.log('dish id :', req.params.id)
    return this.service.deleteDish(req.params.id).then((data) => {
      console.log(data)
      if (!data) {
        console.log('dish deleted')
        res.redirect('/dish')
      } else {
        res.redirect(`/dish/${req.params.id}`)
      }
    })
  }
}

module.exports = DishRoute
