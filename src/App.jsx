import React from "react";
import "./App.css";
import { TicTacToe } from "./games";
import styled from "styled-components";

function App() {
  const Game = styled.div`
    width: 80vw;
    margin: 40px auto;
    @media (max-width: 767px) {
      width: 90vw;
    }
  `;
  return (
    <div className="App">
      <Game>
        <TicTacToe />
      </Game>
    </div>
  );
}

export default App;
