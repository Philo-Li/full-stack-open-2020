import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

// const rawUrl = 'http://localhost:3002/bmi?height=180&weight=72'

app.get('/bmi?', function (req, res) {
  console.log('req.query', req.query);
  const { height, weight } = req.query;
  const bmi = calculateBmi(Number(height), Number(weight));
  const result = {
    weight: weight,
    height: height,
    bmi: bmi
  };
  res.send(JSON.stringify(result));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});