import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'
import './index.css'

axios
  .get('http://localhost:3001/persons')
  .then(response => {
    const persons = response.data
    console.log(persons)
  })

ReactDOM.render(
  <App />, document.getElementById('root')
)