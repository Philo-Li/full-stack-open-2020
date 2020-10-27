import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase1 {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBase2 extends CoursePartBase1 {
    description: string;
  }
  
  interface CoursePartOne extends CoursePartBase2 {
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase1 {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartBase2 {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends CoursePartBase2 {
    name: "Fundamentals of computer";
    exerciseSubmitCount: number;
  }

  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Fundamentals of computer",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmitCount: 10
    }
  ];

  interface HeaderProps {
    name: string;
  }
  
  const Header: React.FC<HeaderProps> = ({name}) => {
    return <h1>{name}</h1>;
  };

  // interface CourseProps {
  //   name: string;
  //   exerciseCount: number;
  // }

  interface CoursePartsProps {
    courseParts: CoursePart[];
  }

  interface CoursePartProps {
    part: CoursePart;
  }
  
  const Total: React.FC<CoursePartsProps> = ({courseParts}) => {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  };

  const Part: React.FC<CoursePartProps> = ({part}) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };
    switch (part.name){
      case "Fundamentals":
        return(
          <p>{part.name} {part.exerciseCount}</p>
        )
      case "Using props to pass data":
        return(
          <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
        )
      case "Deeper type usage":
        return(
          <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
        )
      case "Fundamentals of computer":
        return(
          <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmitCount}</p>
        )
      default:
        return assertNever(part);
    }
  };

  const Content: React.FC<CoursePartsProps> = ({courseParts}) => {
    return (
      <p>
        {courseParts.map((course) => {
        return (
          <p key={course.name}>
            {/* <p>{course.name} {course.exerciseCount}</p> */}
            <Part part={course}/>
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