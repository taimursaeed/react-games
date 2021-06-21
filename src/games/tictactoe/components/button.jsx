import React, { useState } from "react";

const styles = {
  button: {
    fontSize: "30px",
  },
};
export default function Button({ id, isClicked, value, onClick }) {
  let buttonObj = { id, isClicked, value };
  const [state, setState] = useState(buttonObj);

  const handleClick = () => {
    const currentTurn = onClick();
    setState((prevState) => {
      return { ...prevState, isClicked: true, value: currentTurn };
    });
  };

  return (
    <button onClick={handleClick} disabled={state.isClicked}>
      {state.id.toString()}
      <br />
      {state.isClicked.toString()}
      <br />
      <span style={styles.button}>{state.value}</span>
    </button>
  );
}
