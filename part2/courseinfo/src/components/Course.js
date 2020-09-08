import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header course = {course} />
        <Content course = {course}/>
        <Total course = {course}/>
      </div>
    )
  }
  
  const Header = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }
  
  const Content = ({course}) => {
    return (
      course.parts.map(item => {
        return <p>{item.name} {item.exercises}</p>
      })
    )
  }
  
  const Total = ({course}) => {
    let sum = course.parts.reduce((s, p) => {
      //console.log('what is happenning', s ,p.exercises)
      return s + p.exercises
    }, 0)
    return (
      <div>
        <p><b>total of {sum} exercises</b></p>
      </div>
    )
  }

  export default Course