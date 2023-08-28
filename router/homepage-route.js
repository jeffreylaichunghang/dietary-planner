class HomePageRouter {
    constructor(express) {
        this.express = express;
    }

    route() {
        let router = this.express.Router()

        router.get('/', this.getHomePage.bind(this))

        return router
    }

    getHomePage(req, res) {
        res.render('home', {
            layout: 'home'
        })
    }
}

module.exports = HomePageRouter;
