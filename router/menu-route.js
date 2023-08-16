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

    return router
  }

  showMenu(req, res) {
    res.render('menus', { script: scripts[1] })
  }

  getMenu(req, res) {
    console.log(req.query)

    let user = 1
    return this.service.getMenu(user, req.query).then((data) => {
      if (data.length == 0) {
        res.render('menus', {
          scripts: scripts[1],
          data: data
        })
      } else {
        // res.render('menus', {
        //   scripts: scripts[1],
        //   data: data
        // })
        res.send(data)
      }
    })
  }
}

module.exports = MenuRoute;
