package.json

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
(before change)

sessions & cookies
session management works as follows: A session object will be created with each request and the session object is only saved in the database when the user is logged in (saveUninitialized: false). As long as the user is logged in, the session object is not changed and the data of the session object in the database are not updated (resave: false).
