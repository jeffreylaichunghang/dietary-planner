function isLoggedIn(req, res, next) {
  //console.log(req)
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/menu')
}

module.exports = {
  isLoggedIn,
  notLoggedIn,
}
