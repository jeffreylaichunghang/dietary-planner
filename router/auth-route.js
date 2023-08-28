const { notLoggedIn } = require('../utilities/middleware')

class AuthRoute {
  constructor(express, passport) {
    this.express = express;
    this.passport = passport;
  }

  route() {
    let router = this.express.Router()

    router.get('/login', notLoggedIn, this.getLoginPage.bind(this))
    router.get('/signup', notLoggedIn, this.getSignupPage.bind(this))
    router.get('/error', this.getErrorPage.bind(this))
    router.get('/auth/google', this.googleAuth())
    router.get('/auth/google/callback', this.googleAuthCb())

    router.post('/login', this.authenticate())
    router.post('/signup', this.signup())
    router.post('/logout', this.logout.bind(this))

    return router
  }

  getLoginPage(req, res) {
    res.render('login', {
      layout: 'home'
    })
  }

  getSignupPage(req, res) {
    res.render('signup', {
      layout: 'home'
    })
  }

  authenticate() {
    return this.passport.authenticate('local-login', {
      successRedirect: '/menu',
      failureRedirect: '/error',
    })
  }

  signup() {
    return this.passport.authenticate('local-signup', {
      successRedirect: '/login',
      failureRedirect: '/signup'
    })
  }

  getErrorPage(req, res) {
    res.render('login', {
      message: 'Wrong credentials'
    })
  }

  logout(req, res, next) {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/login');
    })
  }

  googleAuth() {
    return this.passport.authenticate('google', {
      scope: ['email', "profile"],
    })
  }

  googleAuthCb() {
    return this.passport.authenticate('google', {
      failureRedirect: '/login',
      successRedirect: '/menu'
    })
  }
}

module.exports = AuthRoute
