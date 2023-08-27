const IngredientRouter = require('../../router/ingredient-route')
const IngredientService = require('../../service/ingredient-service')
const request = require('supertest');
const express = require("express");
const app = express();
const knex = require('knex')(require('../../db/knexfile').development)
app.use(express.urlencoded({ extended: false }));
const ingredientService = new IngredientService(knex);
const ingredientRouter = new IngredientRouter(express, ingredientService).route()

describe('IngredientRouter with a ingredientService', () => {
  beforeEach(() => {
    app.use("/", ingredientRouter);
  })

  test('get ingredient route', (done) => {
    request(app)
      .get('/ingredient')
      .expect("Content-Type", /json/)
      .expect(200)

    done()
  })

  test('get ingredient page 1 when page is not specified', done => {
    request(app)
      .get("/ingredient")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.thisPage = 1;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })

  test('get specified ingredient page when receiving page query request', done => {
    request(app)
      .get("/ingredient")
      .expect("Content-Type", /json/)
      .query({ page: 2 })
      .expect(200)
      .expect((res) => {
        res.thisPage = 2;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })

  test('returned data format', done => {
    request(app)
      .get("/ingredient")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res).toEqual(expect.objectContaining({}))
        expect(res.result).toEqual(expect.arrayContaining([]))
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })

  test('data from getting one ingredient', done => {
    request(app)
      .get("/ingredient/1")
      .query({ id: 1 })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        let data = res.body[0]
        res.length === 1
        expect(res[0]).toEqual(expect.objectContaining({}))
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('calories')
        expect(data).toHaveProperty('carb')
        expect(data).toHaveProperty('protein')
        expect(data).toHaveProperty('fat')
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })
})
