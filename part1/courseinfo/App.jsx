const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const parts = course.parts;

  function Header() {
    return <h1>{course.name}</h1>;
  }

  function Part(props) {
    const { name, exCount } = props;
    return (
      <p>
        {name} {exCount}
      </p>
    );
  }

  function Content() {
    return (
      <>
        <Part name={parts[0].name} exCount={parts[0].exercises} />
        <Part name={parts[1].name} exCount={parts[1].exercises} />
        <Part name={parts[2].name} exCount={parts[2].exercises} />
      </>
    );
  }

  function Total() {
    return (
      <p>
        Number of exercises{" "}
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    );
  }

  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
};

export default App;
