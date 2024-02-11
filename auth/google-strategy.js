const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const knexfile = require('../db/knexfile').development;
const knex = require('knex')(knexfile);
require('dotenv').config()

module.exports = (passport) => {
  passport.use(
    'google',
    new GoogleStrategy({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.NODE_ENV === 'production' ? process.env.REMOTE_URL : process.env.LOCAL_URL}auth/google/callback`
    },
      async (accessToken, refreshToken, profile, done) => {
        //console.log(profile);
        const google_id = profile.id;
        const email = profile.emails[0].value;
        const user = await knex('user_credential').where({ google_id }).first();
        //console.log('has user?', user)

        if (!user) {
          const newUser = {
            google_id,
            email,
            username: profile.displayName,
            fname: profile.name.givenName,
            lname: profile.name.familyName
          }
          const id = await knex('user').max('id')
          id[0].max++

          await knex('user_credential')
            .insert({
              id: id[0].max,
              google_id: newUser.google_id,
              access_token: accessToken,
              username: newUser.username
            })

          await knex('user_info')
            .insert({
              id: id[0].max,
              email: newUser.email
            })

          await knex('user_subscription')
            .insert({
              id: id[0].max
            })

          await knex('user_address')
            .insert({ id: id[0].max })

          await knex('user')
            .insert({
              id: id[0].max,
              user_credential_id: id[0].max,
              user_info_id: id[0].max,
              user_address_id: id[0].max,
              user_subscription_id: id[0].max,
              first_name: newUser.fname,
              last_name: newUser.lname
            })

          newUser.id = id[0].max;
          return done(null, [newUser])
        } else {
          return done(null, [user])
        }
      }
    )
  )
}
