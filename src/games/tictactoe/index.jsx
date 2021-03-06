import React, { useState, useEffect } from "react";
import Button from "./components/button";
import { TURNTYPE } from "./constants";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 500px;
  margin: auto;
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  max-width: 400px;
  height: 350px;
  border: 0.5rem solid #f0f0f0;
  border-radius: 1rem;
  overflow: hidden;
  margin: auto;
  box-sizing: border-box;
`;
const Play = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: #de003d;
  color: white;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 0.25rem;
  > svg {
    width: 1rem;
    margin-right: 1rem;
  }
`;
const PlayWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem auto;
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
`;
export default function tictactoe() {
  const GRIDSIZE = 9;

  const cellData = () => {
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

  const [gridCells, setGridCells] = useState(cellData);
  const [turn, setTurn] = useState(TURNTYPE["PLAYER1"]);
  const [winnerText, setWinnerText] = useState(null);
  const [player1Boxes, setPlayer1Boxes] = useState([]);
  const [player2Boxes, setPlayer2Boxes] = useState([]);

  let winner = null;

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
      player: TURNTYPE["PLAYER1"],
    };

    setGridCells(cells);
    setTurn(nextTurn);
  };

  useEffect(() => {
    if (player1Boxes.length >= 3 || player2Boxes.length >= 3) {
      winner = checkForWinner();
    }
    if (winner) {
      const gridCellsCopy = [...gridCells];
      for (const i in gridCellsCopy) {
        gridCellsCopy[i].isClicked = true;
      }
      setGridCells(gridCellsCopy);
      setWinnerText(winner);
    } else {
      if (player1Boxes.length + player2Boxes.length === GRIDSIZE) {
        setWinnerText("DRAW");
        return;
      } else {
        turn === TURNTYPE["PLAYER2"] && turnPlayer2();
      }
    }
  }, [turn]);

  const turnPlayer2 = () => {
    let availableIDs = [];
    const gridCellsCopy = [...gridCells];
    const emptyCells = gridCellsCopy.filter((i) => {
      if (i.isClicked === false) {
        availableIDs.push(i.id);
        return true;
      }
    });
    if (emptyCells.length > 0 && !winner) {
      const randomNumber = Math.floor(Math.random() * availableIDs.length - 1);
      const selectedID = availableIDs[randomNumber > -1 ? randomNumber : 0];

      const randomID = gridCellsCopy.find((i) => i.id === selectedID);

      gridCellsCopy[randomID.id] = {
        ...gridCellsCopy[randomID.id],
        isClicked: true,
        value: turn.symbol,
        player: TURNTYPE["PLAYER2"],
      };

      setPlayer2Boxes([...player2Boxes, randomID.id]);
      setGridCells(gridCellsCopy);
      setTurn(TURNTYPE["PLAYER1"]);
    }
  };

  const checkForWinner = () => {
    let player1Won = null;
    let player2Won = null;
    for (const i of winnerMatrix) {
      player1Won = findWin(i, player1Boxes, TURNTYPE["PLAYER1"].name);
      player2Won = findWin(i, player2Boxes, TURNTYPE["PLAYER2"].name);
      if (player1Won || player2Won) {
        break;
      }
    }
    return player1Won || player2Won;
  };

  const findWin = (matrixArr, arr, user) => {
    let totalMatches = matrixArr.reduce(
      (acc, current) => (arr.indexOf(current) > -1 ? acc + 1 : acc),
      0
    );
    if (totalMatches >= 3) {
      return `${user} WON`;
    } else {
      return null;
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
        player={i.player}
      />
    ));
  };

  const resetGame = () => {
    winner = null;
    setWinnerText(null);
    setGridCells(cellData());
    setTurn(TURNTYPE["PLAYER1"]);
    setPlayer1Boxes([]);
    setPlayer2Boxes([]);
  };

  return (
    <Wrapper>
      <h1>Tic Tac Toe</h1>
      <Grid>{generateGrid()} </Grid>
      <PlayWrap>
        <h2>{winnerText}</h2>
        {winnerText && <PlayAgain onClick={resetGame} />}
      </PlayWrap>
    </Wrapper>
  );
}

const PlayAgain = (props) => {
  return (
    <Play onClick={props.onClick}>
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
      Play Again
    </Play>
  );
};
