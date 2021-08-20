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
  it('cannot register with missing credentials', async () => {
    let res = await request(server).post('/api/auth/register').send({username: 'bar'}) // missing password
    expect(res.status).toBe(400)
  })
  it('res status 201 if credentials are both valid', async () => {
    let res = await request(server).post('/api/auth/register').send({username: 'bar', password: '1234'})
    expect(res.status).toBe(201)
  })
})

describe('[POST] /api/auth/LOGIN ', () => {

})

describe('[GET] /api/JOKES ', () => {

})

