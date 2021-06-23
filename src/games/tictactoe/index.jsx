import React, { useState, useEffect } from "react";
import Button from "./components/button";
import { TURNTYPE } from "./constants";

export default function tictactoe() {
  const GRIDSIZE = 9;

  const gridObj = () => {
    let temp = [];
    for (let i = 0; i < GRIDSIZE; i++) {
      temp.push({
        id: i,
        isClicked: false,
        value: null,
        player: null,
        onClick: null,
      });
    }
    return temp;
  };

  const [gridCells, setGridCells] = useState(gridObj);
  const [turn, setTurn] = useState(TURNTYPE["PLAYER1"]);
  const [winner, setWinner] = useState(null);
  const [player1Boxes, setPlayer1Boxes] = useState([]);
  const [player2Boxes, setPlayer2Boxes] = useState([]);

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
      turn === TURNTYPE["PLAYER1"] ? TURNTYPE["PLAYER2"] : TURNTYPE["PLAYER1"];
    turn === TURNTYPE["PLAYER1"]
      ? setPlayer1Boxes([...player1Boxes, boxId])
      : setPlayer2Boxes([...player2Boxes, boxId]);

    let cells = [...gridCells];
    const indexOfCell = cells.findIndex((i) => i.id === boxId);
    cells[indexOfCell] = {
      ...cells[indexOfCell],
      isClicked: true,
      value: turn.symbol,
    };

    setGridCells(cells);
    setTurn(nextTurn);
  };

  useEffect(() => {
    turn === TURNTYPE["PLAYER2"] && turnPlayer2();
    if (player1Boxes.length >= 3 || player2Boxes.length >= 3) {
      checkForWinner();
    }
  }, [turn]);

  const turnPlayer2 = () => {
    console.log("PLAYER2 turn");
  };
  const checkForWinner = () => {
    for (const i of winnerMatrix) {
      if (!winner) {
        findWin(i, player1Boxes, TURNTYPE["PLAYER1"].name);
        findWin(i, player2Boxes, TURNTYPE["PLAYER2"].name);
      } else {
        break;
      }
    }
    !winner &&
      player1Boxes.length + player2Boxes.length === GRIDSIZE &&
      setWinner("Draw");
  };

  const findWin = (matrixArr, arr, user) => {
    let result = matrixArr.reduce(
      (acc, current) => (arr.indexOf(current) > -1 ? acc + 1 : acc),
      0
    );
    if (result >= 3) {
      setWinner(`${user} won`);
      return;
    }
  };

  const generateGrid = () => {
    return gridCells.map((i) => (
      <Button
        key={i.id}
        id={i.id}
        isClicked={i.isClicked}
        value={i.value}
        onClick={buttonCallback}
      />
    ));
  };

  return (
    <div>
      <div style={styles.wrap}>
        <h1>Tic Tac Toe</h1>
        <div style={styles.grid}>{generateGrid()} </div>
        <h2> {winner}</h2>
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
