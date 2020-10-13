import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountriesDetails from "./components/CountriesDetails"
import countriesService from "./services/countries"


const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    countriesService
    .getAllCountries()
    .then(data => {
      setCountries(data)
    })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const changeCountriesFilter = filter => {
    setNewFilter(filter);
  }
  
  const countriesToShow = newFilter
    ? countries.filter(country => country.name.toLowerCase().search(newFilter.toLowerCase()) !== -1)
    : countries

  return (
    <div>
      <h2>Countries</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <CountriesDetails
        countries={countriesToShow}
        changeFilter={changeCountriesFilter}
      />

      
    </div>
  )
}

export default App;
