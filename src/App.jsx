import { useState, useEffect } from "react";
import "./App.css";
import Question from "./question";
import EndOfGame from "./endofgame";
import Loader from "./loader/loader"

function App() {
  const [questionData, setQuestionData] = useState();
  const [count, setCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [select, setSelect] = useState("");
  const [allowNext, setAllowNext] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    let load = true ;
    
    // fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple")
    // .then(res=>res.json())
    // .then(data=>setQuestionData(data.results))

    if(load){
      async function getData() {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple"
      );
      let data = await response.json();
      return setQuestionData(data.results);
    }

    getData()
  }

    return ()=>{
      load= false
    }
  }, []);

let display
let currentQuestionData
let rightAnswer

  if (questionData){

     currentQuestionData = questionData[count]
  
    const {question,correct_answer,incorrect_answers,difficulty} = currentQuestionData

  
    
     display =
         <Question
           question={question}
           difficulty={difficulty}
           correctAnswer={correct_answer}
           incorrectAnswers={incorrect_answers}
           handleOptions={handleOptions}
           select={select}
           count={count}
           data={questionData}
         />
      
   
      rightAnswer = questionData.map(item=>item.correct_answer)
  }else{
    return <Loader />
  }



  function handleOptions(event) {
    const { id } = event.target;
    setSelect(id);
    setAllowNext(true);
   
    
    if (id === rightAnswer[count]) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  }
  
  function handleClick() {
    setCount((prev) => prev + 1);
    setAllowNext(false);
    if (correct) {
      setScore((prev) => prev + 1);
      setCorrect(false);
    }
    if (count > questionData.length - 2) {
      setCount(0);
      setGameOver(true);
    }
  }

  function handleRestart() {
    setCount(0);
    setGameOver(false);
    setScore(0);
  }

  return (
    <div className="App">
      { gameOver ? (
        <EndOfGame
         correctAnswer={rightAnswer}
         myScore={score}
         handleRestart={handleRestart}
        />
      ) : 
       <div className="qtn">
       {questionData && display}
      
      <button
        onClick={handleClick}
        className={`next_btn ${allowNext ? "enable" : "disable"}`}
      >
        {count >= questionData.length - 1 ? "Finish" : "Next"}
      </button>
       </div>
      
      }
    </div>
  )

}

export default App
