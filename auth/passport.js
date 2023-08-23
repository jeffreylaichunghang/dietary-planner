const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const googleStrategy = require('./google-strategy')
const knexfile = require('../db/knexfile').development;
const knex = require('knex')(knexfile);
const bcrypt = require('bcrypt');


module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    'local-login',
    new LocalStrategy(async (username, password, done) => {
      try {

        let user = await knex('user_credential').where({ username: username });
        if (user.length == 0) {
          return done(null, false, {
            message: 'Cannot find user'
          })
        }
        //console.log('username :', username)
        //console.log('password :', password)
        //console.log('user :', user)

        const result = bcrypt.compareSync(password, user[0].password)

        if (result == true) {
          return done(null, user)
        } else {
          return done(null, false, {
            message: 'Incorrect credentials'
          })
        }
      } catch (error) {
        console.error(error);
        return done(error)
      }
    })
  )

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'username',
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        let user = await knex('user_credential').where({ username }).first();

        //console.log('has user ?', user)
        if (user) {
          return done(null, false, {
            message: 'Username already exists'
          })
        }

        //console.log('data :', req.body)
        let id = await knex('user').max('id')
        id[0].max++
        let firstname = req.body.firstname
        let middlename = req.body.middlename
        let lastname = req.body.lastname
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        let newUser = [{
          firstname,
          middlename,
          lastname,
          username,
          password: hash,
          id: id[0].max,
        }]

        try {
          await knex('user_credential')
            .insert({
              id: id[0].max,
              username: username,
              password: hash
            })
          await knex('user_address')
            .insert({ id: id[0].max })
          await knex('user_info')
            .insert({ id: id[0].max })
          await knex('user_subscription')
            .insert({ id: id[0].max })
          await knex('user')
            .insert({
              id: id[0].max,
              first_name: firstname,
              middle_name: middlename,
              last_name: lastname,
              user_credential_id: id[0].max,
              user_address_id: id[0].max,
              user_subscription_id: id[0].max,
              user_info_id: id[0].max
            })
        } catch (error) {
          console.error(error);
        }

        return done(null, newUser);
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user[0].id)
  })

  passport.deserializeUser(async (id, done) => {
    let users = await knex('user').where({ id: id })
    if (users.length == 0) {
      return done(new Error(`Wrong user id ${id}`))
    }
    let user = users[0]
    return done(null, user)
  })

  googleStrategy(passport)
}
