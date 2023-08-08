
# Dietary Planner

A dietary planner for tracking one's dietary history to achieve his/her healthcare goal


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Documentation

[Documentation](https://app.swaggerhub.com/apis/fdcnal/food-data_central_api/1.0.1#/FoodNutrient)
[Documentation](https://fdc.nal.usda.gov/api-guide.html)
[Documentation](https://api.data.gov/docs/developer-manual/)


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## Roadmap

- Additional browser support

- Add more integrations


## Authors

- [@octokatherine](https://www.github.com/octokatherine)
