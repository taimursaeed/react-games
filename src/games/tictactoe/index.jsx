import React, { useState } from "react";
import Button from "./components/button";
import { TURNTYPE } from "./constants";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    maxWidth: "500px",
    margin: "auto",
  },
};
export default function tictactoe() {
  const [turn, setTurn] = useState(TURNTYPE["PLAYER"]);

  const buttonCallback = () => {
    const nextTurn =
      turn === TURNTYPE["PLAYER"] ? TURNTYPE["COMPUTER"] : TURNTYPE["PLAYER"];
    setTurn(nextTurn);
    return turn.symbol;
  };

  let grid = [];
  const generateGrid = (cells) => {
    for (let i = 0; i < cells; i++) {
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
      <div style={styles.grid}>{generateGrid(9)} </div>
    </div>
  );
}
