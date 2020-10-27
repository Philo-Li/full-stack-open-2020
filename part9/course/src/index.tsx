import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface HeaderProps {
    name: string;
  }
  
  const Header: React.FC<HeaderProps> = ({name}) => {
    return <h1>{name}</h1>;
  };

  interface CourseProps {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartsProps {
    courseParts: CourseProps[]
  }
  
  const Total: React.FC<CoursePartsProps> = ({courseParts}) => {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  };

  const Content: React.FC<CoursePartsProps> = ({courseParts}) => {
    return (
      <p>
        
        {courseParts.map((course) => {
        return (
          <p key={course.name}>
            {course.name} {course.exerciseCount}
          </p>
          
        )
      })}
      </p>
    )
  };

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));