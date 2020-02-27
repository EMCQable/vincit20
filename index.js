const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('build'))

var counter = 0;

const handleCounter = () => {
  counter = counter +1;
  var reward = 0;
  var untilNextReward = 10 - counter % 10
  if (untilNextReward === 0){
    untilNextReward = 10;
  }
  if (counter % 10 === 0){
    reward = 5;
  }
  if (counter % 100 === 0){
    reward = 40;
  }
  if (counter === 500){
    counter = 0;
    reward = 250;
  }
  const info = {
    reward,
    untilNextReward
  }
  return info
}

app.get('/counter', (req, res) => {
  const info = handleCounter();
  console.log('counter at ', counter)
  console.log(info)
  res.json(info);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
