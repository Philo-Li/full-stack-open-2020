const calculateBmi = (height: number, mass: number): String => {
  const changedHeight = (height/100)**2
  const bmi = mass/changedHeight
  console.log('bmi', bmi)
  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi < 25) {
    return 'normal weight';
  } else if (bmi < 30) {
    return 'overweight';
  }else{
    return 'obese'
  }
}

console.log(calculateBmi(180, 74));
