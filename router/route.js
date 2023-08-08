class Router {
  constructor(express, service) {
    this.express = express;
    this.service = service;
  }

  route() {
    const router = this.express.Router();

    router.get('/', this.getHomePage.bind(this));

    return router
  }

  getHomePage(req, res) {
    res.render('home')
  }
}

module.exports = Router;
