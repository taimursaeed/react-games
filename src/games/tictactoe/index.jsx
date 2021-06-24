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
  height: 300px;
`;
const Play = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: #fafafa;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  &:hover {
    background: #f2f2f2;
  }
  > svg {
    width: 1rem;
    margin-right: 1rem;
  }
`;
const PlayWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
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
      player: TURNTYPE["PLAYER1"],
    };

    setGridCells(cells);
    setTurn(nextTurn);
  };

  useEffect(() => {
    (player1Boxes.length >= 3 || player2Boxes.length >= 3) && checkForWinner();
  }, [player1Boxes, player2Boxes]);

  useEffect(() => {
    turn === TURNTYPE["PLAYER2"] && turnPlayer2();
  }, [turn]);

  useEffect(() => {
    if (winner) {
      const gridCellsCopy = [...gridCells];
      for (const i in gridCellsCopy) {
        gridCellsCopy[i].isClicked = true;
      }
      setGridCells(gridCellsCopy);
    }
  }, [winner]);

  const turnPlayer2 = () => {
    console.log("PLAYER2 turn");
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
      setWinner("DRAW");
  };

  const findWin = (matrixArr, arr, user) => {
    let result = matrixArr.reduce(
      (acc, current) => (arr.indexOf(current) > -1 ? acc + 1 : acc),
      0
    );
    if (result >= 3) {
      setWinner(`${user} WON`);
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
        player={i.player}
      />
    ));
  };
  const resetGame = () => {
    setWinner(null);
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
        <h2>{winner}</h2>
        {winner && <PlayAgain onClick={resetGame} />}
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
