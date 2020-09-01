import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [popular, setPopular] = useState(0)
  const [voted, setVoted] = useState(Array(6).fill(0))

  const randomSelected = () => {
    const select = Math.floor(Math.random() * 6)
    setSelected(select)
    //console.log('setSelected', setSelected, 'selected', selected)
  }

  const vote = () => {
    setVoted({...voted, [selected]: voted[selected]+1});
    if(voted[selected] >= voted[popular]){
      setPopular(selected)
    }
    console.log("voted:", voted[selected], "selected:", selected)
    console.log("popular:", popular, "voted[popular]:", voted[popular])
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        <button onClick = {() => vote()}  >vote</button>
        <button onClick = {() => randomSelected()}  >next anecdote</button>
        
      </div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[popular]}
      <p>
        has {voted[popular]} votes
      </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...the remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)