import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(null);

  function Header() {
    return <h1>Share your feedback</h1>;
  }

  function handleGoodClick() {
    setGood(good + 1);
    setTotal(total + 1);
    setAverage((total + 1) / (total + 1));
  }

  function handleNeutralClick() {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setAverage(total / (total + 1));
  }

  function handleBadClick() {
    setBad(bad + 1);
    setTotal(total + 1);
    if (total === 1) {
      setAverage(-1);
    } else {
      setAverage((total - 1) / (total + 1));
    }
  }

  function getPositive() {
    if (total === 0) {
      return 0;
    }
    return (good / total) * 100;
  }

  function getAverage() {
    return average ? average : "No feedback yet";
  }

  function ButtonBar() {
    return (
      <>
        <button onClick={handleGoodClick}>Good</button>&nbsp;
        <button onClick={handleNeutralClick}>Neutral</button>&nbsp;
        <button onClick={handleBadClick}>Bad</button>
      </>
    );
  }

  function Stats() {
    return (
      <>
        <h1>Statistics</h1>
        {total === 0 ? (
          <p>No feedback yet</p>
        ) : (
          <>
            <table>
              <tr>
                <td>Good: </td>
                <td>{good}</td>
              </tr>
              <tr>
                <td>Neutral: </td>
                <td>{neutral}</td>
              </tr>
              <tr>
                <td>Bad: </td>
                <td>{bad}</td>
              </tr>
              <tr>
                <td colSpan={2}>--------------</td>
              </tr>
              <tr>
                <td>Total: </td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>Average: </td>
                <td>{getAverage()}</td>
              </tr>
              <tr>
                <td>Positive: </td>
                <td>{getPositive()}</td>
              </tr>
            </table>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div>
        <Header />
        <ButtonBar />
        <Stats />
      </div>
    </>
  );
};

export default App;
