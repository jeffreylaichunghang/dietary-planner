//files
const IngredientRouter = require('./router/ingredient-route');
const DishRoute = require('./router/dish-route')
const IngredientService = require('./service/ingredient-service');
const DishService = require('./service/dish-service')
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

const ingredientService = new IngredientService(knex);
const dishService = new DishService(knex)
app.use('/', new IngredientRouter(express, ingredientService).route());
app.use('/', new DishRoute(express, dishService).route())

app.listen(port, () => {
  console.log('app is listening to port ' + port)
});
