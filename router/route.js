let scripts = ['/js/main.js']

class Router {
  constructor(express, service) {
    this.express = express;
    this.service = service;
  }

  route() {
    const router = this.express.Router();

    router.get('/home', this.getHomePage.bind(this));
    router.get('/ingredient', this.getIngredientPage.bind(this));
    router.get('/ingredient/:id', this.getIngredient.bind(this));
    router.get('/dish', this.getDishPage.bind(this));
    router.get('/menu', this.getMenuPage.bind(this));

    router.delete('/deleteIngredient/:id', this.deleteIngredient.bind(this))

    return router
  }

  getHomePage(req, res) {
    res.render('home', {
      script: scripts
    })
  }

  getIngredientPage(req, res) {
    return this.service.getIngredientPage().then((ingredients) => {
      //res.send(data)
      res.render('ingredients', {
        ingredient: ingredients,
        script: scripts
      })
    })
  }

  getIngredient(req, res) {
    console.log(req.params.id)
    return this.service.getIngredient(req.params.id).then((ingredient) => {
      console.log(`ingredient ${req.params.id} info retrieved!`)
      //res.send(ingredient)
      res.render('ingredient', {
        info: ingredient[0],
        script: scripts
      })
    })
  }

  deleteIngredient(req, res) {
    console.log(req.params.id)
    return this.service.deleteIngredient(req.params.id).then(() => {
      res.send('ingredient deleted')
      //res.redirect('/ingredient')
    })
  }

  getDishPage(req, res) {
    res.render('dish')
  }

  getMenuPage(req, res) {
    res.render('menu')
  }
}

module.exports = Router;
