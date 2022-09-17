import { useState , useEffect } from "react";
import ReactHtmlParser from "html-react-parser";

export default function Question(props) {
  
  
  
  
  let mainQuestion;
  // let allAnswers;
  let individualOption;
  // let rightAnswer;
  // let wrongAnswers;
  

  
 
      mainQuestion =  ReactHtmlParser(props.question);
      
        
    const rightAnswer = props.correctAnswer
      
    const wrongAnswers = props.incorrectAnswers
        
        // shuffle function(reuseable)

       
        
       const allAnswers =  [rightAnswer,...wrongAnswers]
          

       function shuffled(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const swapIndex = Math.floor(Math.random() * (i + 1));
          const temp = shuffledArray[i];
          shuffledArray[i] = shuffledArray[swapIndex];
          shuffledArray[swapIndex] = temp;
        }
        
        return shuffledArray;
      }
       
      
         individualOption =  shuffled(allAnswers).map((item, index) => {
             
           return (
             <span
               className={`individualOption ${props.select === item ? "selected" : null}`} 
               onClick={(event)=>props.handleOptions(event)}
               key={index}
               id={item}
              >
               {ReactHtmlParser(item)}
             </span>
           );
         });
       

         
       
        
        

        
        


    
  

  



  return (
    <div className="question">
      
        <div className="gameOn">
          <h1>{mainQuestion}</h1>
            <p>
              Questions {props.count + 1} out of {props.data.length} remaining
            </p>
         
          { individualOption}

          
        </div>
    </div>
  );
}
