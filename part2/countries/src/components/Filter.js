import React from 'react'

const Filter = ({ value, onChange}) => {
  return (
    <div>
      <label htmlFor="countries-search">find countries</label>
      <input 
        value = {value}
        onChange={onChange}/>
    </div>

  )
}

export default Filter