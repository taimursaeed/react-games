import React, { useState, useEffect } from "react";
import Button from "./components/button";
import { TURNTYPE } from "./constants";

export default function tictactoe() {
  const GRIDSIZE = 9;
  const [turn, setTurn] = useState(TURNTYPE["PLAYER"]);
  const [winner, setWinner] = useState(null);
  const [playerBoxes, setPlayerBoxes] = useState([]);
  const [computerBoxes, setComputerBoxes] = useState([]);

  const winnerMatrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const buttonCallback = (boxId) => {
    const nextTurn =
      turn === TURNTYPE["PLAYER"] ? TURNTYPE["COMPUTER"] : TURNTYPE["PLAYER"];
    turn.type === "PLAYER"
      ? setPlayerBoxes([...playerBoxes, boxId])
      : setComputerBoxes([...computerBoxes, boxId]);

    setTurn(nextTurn);

    return { value: turn.symbol, player: turn.type };
  };

  useEffect(() => {
    turn.type === "COMPUTER" && turnComputer();
    if (playerBoxes.length >= 3 || computerBoxes.length >= 3) {
      checkForWinner();
    }
  }, [turn]);

  const turnComputer = () => {
    console.log("computer turn");
  };
  const checkForWinner = () => {
    for (const i of winnerMatrix) {
      if (!winner) {
        findWin(i, playerBoxes, "PLAYER");
        findWin(i, computerBoxes, "COMPUTER");
      } else {
        break;
      }
    }
    !winner &&
      playerBoxes.length + computerBoxes.length === GRIDSIZE &&
      setWinner("Draw");
  };

  const findWin = (matrixArr, arr, user) => {
    let result = matrixArr.reduce(
      (acc, current) => (arr.indexOf(current) > -1 ? acc + 1 : acc),
      0
    );
    if (result >= 3) {
      setWinner(user);
      return;
    }
  };

  let grid = [];
  const generateGrid = (GRIDSIZE) => {
    for (let i = 0; i < GRIDSIZE; i++) {
      grid.push(
        <Button
          key={i}
          id={i}
          isClicked={false}
          value=""
          onClick={buttonCallback}
        />
      );
    }
    return grid;
  };
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div style={styles.wrap}>
        <div style={styles.grid}>{generateGrid(GRIDSIZE)} </div>
        <h2> {winner && `Winner: ${winner}`}</h2>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
  },
  wrap: {
    maxWidth: "500px",
    margin: "auto",
  },
};
