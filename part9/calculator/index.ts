import express from 'express';
import {calculateBmi} from './bmiCalculator'
const app = express();

// const rawUrl = 'http://localhost:3002/bmi?height=180&weight=72'

app.param(['height', 'weight'], function (_req, _res, next, value) {
  console.log('CALLED ONLY ONCE with', value)
  next()
})

app.get('/bmi?', function (req, res) {
  console.log('req.query', req.query)
  const { height, weight } = req.query
  const bmi = calculateBmi(Number(height), Number(weight))
  const result = {
    weight: weight,
    height: height,
    bmi: bmi
  }
  console.log(result)
  res.send(JSON.stringify(result))
  res.end()
})

// console.log('test', calculateBmi(180, 72))

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});