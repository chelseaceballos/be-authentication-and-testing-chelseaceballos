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

describe('[POST] /api/auth/REGISTER', () => {
  it('cannot register with missing credentials', async () => {
    let res = await request(server).post('/api/auth/register').send({username: 'bar'}) // missing password
    expect(res.status).toBe(400) // bad request
  })
  it('res status 201 if credentials are both valid', async () => {
    let res = await request(server).post('/api/auth/register').send({username: 'bar', password: '1234'})
    expect(res.status).toBe(201)
  })
})

describe('[POST] /api/auth/LOGIN', () => {
  it('resolves in sad path if incorrect password is entered status: 401', async () => {
   //register first
    let register = await request(server).post('/api/auth/register').send({username: 'bar', password: '1234'})
   // login with  wrong pw
    let login = await request(server).post('/api/auth/login').send({username: 'bar', password: 'bar'})
  // assert
    expect(login.status).toBe(401) // unauthorized
    expect(login.body.message).toMatch("invalid credentials")
  })
  it('can login status:200', async () => {
    let register = await request(server).post('/api/auth/register').send({username: 'bar', password: '1234'})
    let login = await request(server).post('/api/auth/login').send({username: 'bar', password: '1234'})
    expect(login.status).toBe(200)
    expect(login.body.message).toMatch("welcome, bar")
  })
})

describe('[GET] /api/JOKES ', () => {
  it('restricts jokes if not logged in :( ', async () => {
    //user tries to immediately get jokes without register/login
    const jokes = await request(server).get('/api/jokes')
    expect(jokes.status).toBe(401) //unauthorized
    expect(jokes.body.message).toMatch("Token required")
  })
  it('can see jokes if auth', async () => {
    let register = await request(server).post('/api/auth/register').send({username: 'bar', password: '1234'})
    let login = await request(server).post('/api/auth/login').send({username: 'bar', password: '1234'})
    let jokes = await request(server).get('/api/jokes').set('authorization', login.body.token) 
    expect(jokes.status).toBe(200)
    expect(jokes.body).toHaveLength(3)
  })
})

