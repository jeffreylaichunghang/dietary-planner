/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const fakePassword1 = '1234';
const fakePassword2 = '5678';

const hash1 = bcrypt.hashSync(fakePassword1, salt)
const hash2 = bcrypt.hashSync(fakePassword2, salt);

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_credential').del()
  await knex('user_address').del()
  await knex('user_subscription').del()
  await knex('user_info').del()
  await knex('user').del()
  await knex('user_credential').insert([
    {
      id: 1,
      username: 'johndoe123',
      password: hash1,
    },
    {
      id: 2,
      username: 'rickGrimes',
      password: hash2,
    },
  ]);
  await knex('user_address').insert([
    {
      id: 1,
      flat: 'A',
      floor: 1,
      block: '1',
      building: 'Apartment',
      street_name: 'funny road',
      street_number: 123,
      district: 'Kowloon',
      city: 'Hong Kong',
      state: 'Hong Kong',
      country: 'Hong Kong',
    },
    {
      id: 2,
      building: 'A very big house',
      street_name: 'rich road',
      street_number: 456,
      district: 'hong kong island',
      city: 'Hong Kong',
      state: 'Hong Kong',
      country: 'Hong Kong',
    },
  ]);
  await knex('user_subscription').insert([
    {
      id: 1,
      start_date: '1/1/2023',
      end_date: '12/31/2023',
      premium: true,
    },
    {
      id: 2,
      start_date: '1/1/2008',
      end_date: '8/20/2020',
      premium: false,
    },
  ]);
  await knex('user_info').insert([
    {
      id: 1,
      email: 'jdoe@gmail.com',
      phone_number: 85212345678,
      sex: 'male'
    },
    {
      id: 2,
      email: 'rgrimes@gmail.com',
      phone_number: 8529876754321,
      sex: 'female'
    },
  ]);
  await knex('user').insert([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      middle_name: 'A',
      user_credential_id: 1,
      user_address_id: 1,
      user_subscription_id: 1,
      user_info_id: 1,
    },
    {
      id: 2,
      first_name: 'Rick',
      last_name: 'Grimes',
      user_credential_id: 2,
      user_address_id: 2,
      user_subscription_id: 2,
      user_info_id: 2,
    },
  ]);
};
