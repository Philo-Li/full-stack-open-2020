/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

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

app.post('/exercise', function (req, res) {
  console.log('req.body', req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if(!daily_exercises || !target){
    throw new Error('parameters missing');
  }
  console.log('target', target, 'daily_exercises', daily_exercises);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = daily_exercises.map((a: unknown) => {
    if(isNaN(Number(a))){
      throw new Error('malformatted parameters');
    }
    return Number(a);
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = calculateExercises(Number(target), data);
  res.send(JSON.stringify(result));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});