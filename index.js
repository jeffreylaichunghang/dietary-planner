//files
const IngredientRouter = require('./router/ingredient-route');
const DishRoute = require('./router/dish-route');
const IngredientService = require('./service/ingredient-service');
const DishService = require('./service/dish-service');
const MenuService = require('./service/menu-service');
const MenuRoute = require('./router/menu-route');
const AuthRoute = require('./router/auth-route');
const setupPassport = require('./auth/passport')
const knexfile = require('./db/knexfile').development;

//npm modules
const passport = require('passport')
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const { engine } = require('express-handlebars');
const knex = require('knex')(knexfile);
const cors = require('cors')

const port = process.env.PORT || 3000;

//middleware
app.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
  })
)
app.use(cors())
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

setupPassport(app);

const ingredientService = new IngredientService(knex);
const dishService = new DishService(knex);
const menuService = new MenuService(knex);
app.use('/', new IngredientRouter(express, ingredientService).route());
app.use('/', new DishRoute(express, dishService).route())
app.use('/', new MenuRoute(express, menuService).route())
app.use('/', new AuthRoute(express, passport).route())

app.listen(port, () => {
  console.log('app is listening to port ' + port)
});
