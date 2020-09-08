import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'

axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    const persons = response.data
    console.log(persons)
  })

ReactDOM.render(
  <App />, document.getElementById('root')
)