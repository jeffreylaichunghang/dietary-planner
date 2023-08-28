
# Dietary Planner

A dietary planner for tracking one's dietary history to achieve his/her healthcare goal


## API Reference

#### Get all ingredients

```http
  GET /ingredient
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| --------- | -------- | To get a list of ingredients |

#### Get one ingredient

```http
  GET /ingredient/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | To get information of one ingredient |

#### Create one ingredient

```http
  POST /ingredient/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | To create one ingredient          |

#### Update one ingredient

```http
  UPDATE /ingredient/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | To update information of one ingredient |

#### Delete one ingredient

```http
  DELETE /ingredient/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | To delete one ingredient |

## Documentation

[Documentation](https://app.swaggerhub.com/apis/fdcnal/food-data_central_api/1.0.1#/FoodNutrient)
[Documentation](https://fdc.nal.usda.gov/api-guide.html)
[Documentation](https://api.data.gov/docs/developer-manual/)


## Roadmap

- finish stripe payment along with user authorization across multiple pages

- Add sorting features for tables

- Add table columns toggling

- Add more integrations, unit tests and a few e2e

-


## Authors

- [@jeffreylaichunghang](https://github.com/jeffreylaichunghang)
