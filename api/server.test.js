// MVP requires 2tests per endpoint :)
const db = require('../data/dbConfig');
const model = require('./auth/auth-model'); // User? maybe?
const server = require('./server');
const request = require('supertest');


beforeAll(async () =>{
  await db.migrate.rollback() 
  await db.migrate.latest() 
})
beforeEach(async () => {
  await db('users').truncate() 
})
afterAll(async () => {
  await db.destroy()
})


describe('IF THESE FAIL, ITS OVER', () =>{
  test('sanity', () => {
    expect(true).toBe(true) // why would this be false, i got spooked
  })
  
  test('correct env var', () => {
    expect(process.env.NODE_ENV).toBe("testing")
  })
})

describe('[POST] /api/auth/REGISTER ', () => {

})

describe('[POST] /api/auth/LOGIN ', () => {

})

describe('[GET] /api/JOKES ', () => {

})

