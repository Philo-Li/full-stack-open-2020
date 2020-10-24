type Result = { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
};

const calculateExercises = (data: Array<number>, target: number): Result => {
  const periodLength = data.length;
  let trainingDays = 0, rating, ratingDescription, average = 0;
  let failDays = 0

  for(let day of data) {
    if(day > 0){
      trainingDays++;
    }else if(day < target) {
      failDays++;
    }
    average += day
  }

  rating = 10 - Math.floor(failDays / periodLength * 10)
  if(rating < 5){
    ratingDescription = 'Too bad'
  }else if(rating <= 8){
    ratingDescription = 'not too bad but could be better'
  }else{
    ratingDescription = 'Good job!'
  }

  const result = { 
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: failDays ? false : true,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average/periodLength
  }
  return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))