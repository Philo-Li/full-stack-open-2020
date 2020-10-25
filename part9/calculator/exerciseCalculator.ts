type Result = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

interface CalculateValues {
  target: number;
  data: Array<number>;
}

const parseArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [a, b, target, ...temp] = args;
  console.log(a, b, 'target', target, 'temp', temp);

  const data = temp.map(a => {
    if(isNaN(Number(a))){
      throw new Error('Provided values were not numbers!');
    }
    return Number(a);
  });

  return {
    target: Number(args[2]),
    data: data.slice(1)
  };
};

const calculateExercises = (target: number, data: Array<number>): Result => {
  const periodLength = data.length;
  let trainingDays = 0, ratingDescription, average = 0;
  let failDays = 0;

  for(const day of data) {
    if(day > 0){
      trainingDays++;
    }else if(day < target) {
      failDays++;
    }
    average += day;
  }

  const rating = 10 - Math.floor(failDays / periodLength * 10);
  if(rating < 5){
    ratingDescription = 'Too bad';
  }else if(rating <= 8){
    ratingDescription = 'not too bad but could be better';
  }else{
    ratingDescription = 'Good job!';
  }

  const result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: failDays ? false : true,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average/periodLength
  };
  return result;
};

const { target, data } = parseArguments(process.argv);
console.log(calculateExercises(target, data));

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))