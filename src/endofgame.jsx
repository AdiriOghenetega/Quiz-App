import ReactHtmlParser from 'html-react-parser'
export default function EndOfGame(props){
    return (
        <div className="endpage">
         <h2>Game Over...Your final score is {props.myScore} points</h2>
         <p>The correct answer's for the questions are :</p>
         {props.correctAnswer.map((item,index)=>{
            return <span className="rightAnswers" key={index} >{ReactHtmlParser(item)}</span>
         })}
         <button onClick={props.handleRestart} className="restart_btn">Restart</button>
        </div>
    )
}