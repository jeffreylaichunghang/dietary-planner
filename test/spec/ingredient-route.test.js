const IngredientRouter = require('../../router/ingredient-route')
const IngredientService = require('../../service/ingredient-service')
const request = require('supertest');
const express = require("express");
const app = express();
const knex = require('knex')(require('../../db/knexfile'))

app.use(express.urlencoded({ extended: false }));
app.use("/", IngredientRouter);

let ingredientService;
let response;
let ingredientRouter;

describe('IngredientRouter with a ingredientService', () => {
  beforeEach(() => {
    ingredientService = new IngredientService(knex)
    ingredientRouter = new IngredientRouter(express, ingredientService);

  })

  test('The ingredientRouter should call getIngredientPage', (done) => {
    let page = 1
    ingredientRouter.getIngredientPage(page, response)
      .then(() => {
        expect(ingredientService.getIngredientPage).toHaveBeenCalledWith(page);
        done();
      })
  })

  //unit
  test('IngredientService should be able to get one ingredient data', () => {
    return
  })

  //integration
  test.only('The ingredientRouter should get one ingredient to response of an id', (done) => {
    let id = 1
    ingredientRouter.getIngredient(id, response)
      .then(() => {
        this.ingredientService.getIngredient(id)
      })
  })

  test('The ingredientRouter should add response in POST', (done) => {
    let newIngredient = {
      body: {
        name: 'new ingredient'
      }
    }
    ingredientRouter.addIngredient(newIngredient, response)
      .then(() => {
        expect(ingredientService.addIngredient).toHaveBeenCalledWith('new ingredient')
      })
  })

  test('The ingredientRouter should add response in PUT', (done) => {
    let name = 'new ingredient'
    let id = 1
    ingredientRouter.updateIngredient(name, id, response)
      .then(() => {
        expect(ingredientService.updateIngredient)
          .toHaveBeenCalledWith(name, id)
      })
  })
})
