import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ([good, neutral, bad, allClicks]) => {
  if(allClicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tr>
        <td>good {good}</td>
      </tr>
      <tr>
        <td>neutral {neutral}</td>
      </tr>
      <tr>
        <td>bad {bad}</td>
      </tr>
      <tr>
        <td>all {allClicks}</td>
      </tr>
      <tr>
        <td>average {(good - bad ) / allClicks}</td>
      </tr>
      <tr>
        <td>positive {good / allClicks * 100} %</td>
      </tr>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const feedbackGood = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
  }

  const feedbackNeutral = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const feedbackBad = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }



  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => feedbackGood(good)} text = 'good' />
      <Button onClick={() => feedbackNeutral(neutral)} text = 'neutral' />
      <Button onClick={() => feedbackBad(neutral)} text = 'bad' />
      <h1>Statistics</h1>
      {Statistics([good, neutral, bad, allClicks])}
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);