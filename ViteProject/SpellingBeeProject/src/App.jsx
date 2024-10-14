import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Honeycomb } from "./components/Honeycomb";
import { Guess } from "./components/Guess";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [guess, setGuess] = useState("");
  const addLetter = (letter) => {
    setGuess((g) => g + letter);
  };

  const removeLetter = () => {
    //Remove the final character from the string
    setGuess(guess.slice(0, -1));
  };
  const checkGuess = () => {
    if (data.answers && data.answers.includes(guess)) {
      console.log("Good Job");
    } else {
      console.log("Not in the list");
    }
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
          <section className="container">
            <div className="inputs">
              <div className="center">
                <Guess guess = {guess} />
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
