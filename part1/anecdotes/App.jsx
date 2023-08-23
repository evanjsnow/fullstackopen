import { useEffect, useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [buttonText, setButtonText] = useState("Display a Quote");
  const [quote, setQuote] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [voteArr, setVoteArr] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [voteTally, setVoteTally] = useState(0);

  function handleQuoteClick() {
    const i = Math.floor(Math.random() * anecdotes.length);
    setQuote(anecdotes[i]);
    setButtonText("Display Another Quote");
    setQuoteIndex(i);
    setVoteTally(voteArr[i]);
  }

  function Button() {
    return <button onClick={handleQuoteClick}>{buttonText}</button>;
  }

  function handleVoteClick() {
    voteArr[quoteIndex]++;
    setVoteTally(voteTally + 1);
  }

  function Quote() {
    function QuoteVoteButton(props) {
      return (
        quote.length > 0 && (
          <>
            <h1>
              ({voteTally} vote{voteTally === 1 ? "" : "s"})
            </h1>
            <button onClick={handleVoteClick}>Vote</button>
          </>
        )
      );
    }
    return (
      <>
        <h1>{quote}</h1>
        <QuoteVoteButton />
      </>
    );
  }

  function MostVotes() {
    function compareNumbers(a, b) {
      return b - a;
    }
    const newArr = [...voteArr];
    newArr.sort(compareNumbers);
    const topNum = newArr[0];
    const indexNum = voteArr.indexOf(topNum);
    const topQuote = anecdotes[indexNum];
    return topNum === 0 ? (
      ""
    ) : (
      <>
        <h1>The Quote With The Most Votes Is: </h1>
        <p>
          {topQuote} ({topNum} vote{topNum === 1 ? "" : "s"})
        </p>
      </>
    );
  }

  return (
    <>
      <Button />
      <Quote />
      <MostVotes />
    </>
  );
};

export default App;
