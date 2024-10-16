import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Honeycomb } from "./components/Honeycomb";
import { Guess } from "./components/Guess";
import { Score } from "./components/Score";
import { CorrectGuesses } from "./components/CorrectGuesses";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [guess, setGuess] = useState("");
  const [correctGuesses,setCorrectGuesses] = useState([]);
  const addLetter = (letter) => {
    setGuess((g) => g + letter);
  };

  const addCorrectGuesses = (guess) => {
    setCorrectGuesses([...correctGuesses,guess]);
  }

  const removeLetter = () => {
    //Remove the final character from the string
    setGuess(guess.slice(0, -1));
  };
  const checkGuess = () => {
    if(correctGuesses.includes(guess))
    {
      console.log("Already Found");
    } else if (data.answers && data.answers.includes(guess)) {
      addCorrectGuesses(guess);
      console.log("Good Job");
    } else {
      console.log("Not in the list");
    }

    setGuess('');
  };


  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/api/data.json", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await result.json();
      setData(json.data.today);
      console.log(json.data.today);
    }
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <Header date={data.displayDate} editor={data.editor} />
          <Score correctGuesses = {correctGuesses} />
          <CorrectGuesses correctGuesses={correctGuesses}/>
          <section className="container">
            <div className="inputs">
              <div className="center">
                <Guess guess = {guess}  centerLetter={data.centerLetter}
                  outerLetters={data.outerLetters} />
                <Honeycomb
                  centerLetter={data.centerLetter}
                  outerLetters={data.outerLetters}
                  validLetters={data.validLetters}
                  addLetter = {addLetter}
                  removeLetter = {removeLetter}
                  checkGuess = {checkGuess}
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
