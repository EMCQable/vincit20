const supertest = require('supertest')
const index = require('./app')

const api = supertest(index)


test('response comes through', async () => {
  await api
    .post('/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returns valid on 20', async () => {
  const response = await api.post('/')
    .send({ points: 20 })
  expect(response.body).toStrictEqual({ 'points': 19, 'untilNextReward': 9 })
})

test('returns valid on 0', async () => {
  const response = await api.post('/')
    .send({ points: 0 })
  expect(response.body).toStrictEqual({ 'points': 20, 'untilNextReward': 9 })
})

const smallDelay = async () => {
  return new Promise(resolve => {
    setTimeout(() => { resolve('delay') }, 1)
  })
}

test('300 calls give correct outcome', async () => {
  let response = null
  let points = 20
  for (let index = 0; index < 500; index++) {
    response = await api.post('/').send({ points })
    points = response.body.points
    await smallDelay()
  }
  response = await api.post('/').send({ points })
  expect(response.body).toStrictEqual({ points: 9, untilNextReward: 3 })
})