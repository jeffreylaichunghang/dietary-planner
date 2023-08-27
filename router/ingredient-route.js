let scripts = ['/js/main.js']
const { isLoggedIn, pagination } = require('../utilities/middleware')

class IngredientRouter {
  constructor(express, service) {
    this.express = express;
    this.service = service;
  }

  route() {
    const router = this.express.Router();

    router.get('/ingredient', this.getIngredientPage.bind(this));
    router.get('/ingredient/:id', this.getIngredient.bind(this));
    router.post('/addIngredient', this.addIngredient.bind(this))
    router.put('/updateIngredient/:id', this.updateIngredient.bind(this))
    router.delete('/deleteIngredient/:id', this.deleteIngredient.bind(this))

    return router
  }

  getIngredientPage(req, res) {
    const page = req.query.page ? req.query.page : 1;
    console.log('page :', page)
    return this.service.getIngredientPage(page).then((data) => {
      res.send(data)
      // console.log(data.thisPage)
      // console.log(data)
      // res.render('ingredients', {
      //   ingredient: data.result,
      //   limit: data.limit,
      //   previous: data.previous,
      //   thisPage: data.thisPage,
      //   next: data.next,
      //   script: scripts,
      // })
    })
  }

  getIngredient(req, res) {
    //console.log(req.params.id)
    return this.service.getIngredient(req.params.id).then((ingredient) => {
      console.log(`ingredient ${req.params.id} info retrieved!`)
      res.send(ingredient)
      // res.render('ingredient', {
      //   info: ingredient[0],
      //   script: scripts
      // })
    })
  }

  addIngredient(req, res) {
    console.log('adding new ingredient')
    console.log(req.body)
    this.service.addIngredient(req.body).then(() => {
      res.redirect('/ingredient')
    })
  }

  updateIngredient(req, res) {
    console.log(req.body)
    console.log(req.params.id)
    return this.service.updateIngredient(req.body, req.params.id).then(() => {
      res.redirect(`/ingredient/${req.params.id}`)
    })
  }

  deleteIngredient(req, res) {
    console.log(req.params.id)
    return this.service.deleteIngredient(req.params.id).then((data) => {
      //res.send('ingredient deleted')
      if (data.length !== 0) {
        res.redirect(`/ingredient/${req.params.id}`)
      } else {
        res.redirect('/ingredient')
      }
    })
  }
}

module.exports = IngredientRouter;
