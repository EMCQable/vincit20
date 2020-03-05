const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('build'))

let counter = 0

const handleCounter = () => {
  counter = counter +1
  let reward = 0
  let untilNextReward = 10 - counter % 10
  if (untilNextReward === 0){
    untilNextReward = 10
  }
  if (counter % 10 === 0){
    reward = 5
  }
  if (counter % 100 === 0){
    reward = 40
  }
  if (counter === 500){
    counter = 0
    reward = 250
  }
  const info = {
    reward,
    untilNextReward
  }
  return info
}

app.get('/counter', (req, res) => {
  const info = handleCounter()
  res.json(info)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
