import React from "react";
import "./App.css";
import { TicTacToe } from "./games";
function App() {
  const styles = {
    game: {
      width: "80vw",
      margin: "40px auto",
    },
  };
  return (
    <div className="App">
      <div style={styles.game}>
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;
