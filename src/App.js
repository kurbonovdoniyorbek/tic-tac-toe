import { useEffect, useState } from 'react'
import Ceil from "./components/Ceil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""])
  const [go, setGo] = useState("circle")
  const [winningMessage, setWinningMessage] = useState(null)
  const message = "it's now " + go + "'s go"
  const checkScore = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    winningCombos.forEach((array) => {
      let circleWins = array.every(cell => cells[cell] === "circle")
      if (circleWins) {
        setWinningMessage("Circle Wins!!")
        return
      }
    })
    winningCombos.forEach((array) => {
      let crossWins = array.every(cell => cells[cell] === "cross")
      if (crossWins) {
        setWinningMessage("Cross Wins!!")
        return
      }
    })
  }
  useEffect(() => {
    checkScore()
  })

  if (winningMessage) {
    if (winningMessage.split(' ')[0] === "Cross") {
      toast.success(`Cross Wins !!`);
    }
    else {
      toast.success(`Circle Wins !!`);
    }
  }
  return (
    <div className="App">
      <div className="gameboard">
        {
          cells?.map((cell, index) =>
            <Ceil
              cell={cell}
              cells={cells}
              key={index}
              id={index}
              setCells={setCells}
              go={go}
              setGo={setGo}
              winningMessage={winningMessage}
            />
          )
        }
      </div>
      <p>{winningMessage || message}</p>
      <ToastContainer />
    </div>
  );
}

export default App;
