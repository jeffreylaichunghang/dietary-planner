let scripts = ['/js/main.js']

class MenuRoute {
  constructor(express, service) {
    this.express = express;
    this.service = service;
  }

  route() {
    let router = this.express.Router()

    router.get('/menu', this.getMenu.bind(this))

    return router
  }

  getMenu(req, res) {
    // return this.service.getMenu().then((data) => {
    //   res.render('menu', {
    //       scripts: scripts[0],
    //       data: data
    //     })
    //   })
    // }
    res.send('this is the menu page')
  }
}

module.exports = MenuRoute;
