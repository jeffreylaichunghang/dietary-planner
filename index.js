//files
const Router = require('./router/route');
const Service = require('./service/service');
const knexfile = require('./db/knexfile').development;
//npm modules
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const { engine } = require('express-handlebars');
const knex = require('knex')(knexfile);

const port = process.env.PORT || 3000;
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const service = new Service(knex);
app.use('/', new Router(express, service).route());

app.listen(port, () => {
  console.log('app is listening to port ' + port)
});
