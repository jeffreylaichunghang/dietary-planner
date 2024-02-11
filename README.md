
# Dietary Planner

A dietary planner for tracking one's dietary history to achieve his/her healthcare goal

<https://dietaryplanner.site/>

**frontend/template engine**
express-handlebars

**backend**
Node js, Express js

**database**
Postgres, Knex js

**authentication**
Passport js, OAuth, Google Login

**Api testing**
Postmen

**Deployment**
AWS EC2, Route 53

**CI/CD**
Github Action

- Testing account:
username: johndoe123
password: 1234

- See a sample menu:
do to menu of 17/8/2023

## API Reference

#### Get all ingredients

```http
  GET /ingredient
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `number` | To get a list of all ingredients. Specify the page and the limit is 12, otherwise the default page is 1 |

#### Get one ingredient

```http
  GET /ingredient/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | To get information of one ingredient |

#### Create one ingredient

```http
  POST /addIngredient
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{name, carb, protein, fat}` | `{name: string, carb: number, protein: number, fat: number}` | To create one ingredient and all fields are not nullable|

#### Update one ingredient

```http
  UPDATE /updateIngredient/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{data, id}` | `data: { calories: number, carb: number, protein: number, fat: number, cholesterol: number, trans_fat: number, sat_fat: number, fibre: number, sodium: number, sugar: number, cost: number, wholesaler: string }, id: number` | To update information of one ingredient |

#### Delete one ingredient

```http
  DELETE /deleteIngredient/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | To delete one ingredient |

#### Get all dishes

```http
  GET /dish
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`| `number` | To get a list of all dishes. Specify the page and the limit is 12, otherwise the default page is 1 |

#### Get one dish

```http
  GET /dish/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page` | `number` | To get information of one dish |

#### Create one dish

```http
  POST /addDish
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | To create one dish |

#### Update one ingredient

```http
  UPDATE /updateDish/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{data, id}` | `data: { totalRowValue: number[], ingredientList: string[] }, id: number` | To update information of one ingredient, the totalRowValue is an array of numbers of the last row of the table while the ingredientList is an array of string including all ingredients added in the dish |

#### Delete one ingredient

```http
  DELETE /deleteDish/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | To delete one ingredient |

#### Get menu

```http
  GET /getMenu
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{userId, date}`| `{userId: number, date: string}` | To get the user's menu on a specified date with a format MM/DD/YYYY |

#### Update menu

```http
  UPDATE /updateMenu
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{totalRowValue, dishList, date}`| `{totalRowValue: number[], dishList: string[], date: string}` | Updating user's menu require totalRoValue which is an array of number from the last row of the menu table, dishList which is an array of string including all dishes composing the menu and the date with a format MM/DD/YYYY |

## Documentation

[Documentation](https://app.swaggerhub.com/apis/fdcnal/food-data_central_api/1.0.1#/FoodNutrient)
[Documentation](https://fdc.nal.usda.gov/api-guide.html)
[Documentation](https://api.data.gov/docs/developer-manual/)

## Roadmap

- finish stripe payment along with user authorization across multiple pages

- Add sorting features for tables

- Add table columns toggling

- Add more integrations, unit tests and a few e2e

- Implement flash messages

## Authors

- [@jeffreylaichunghang](https://github.com/jeffreylaichunghang)
