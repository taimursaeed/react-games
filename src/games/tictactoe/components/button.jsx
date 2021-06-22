import React, { useState } from "react";

const styles = {
  button: {
    fontSize: "30px",
  },
};
export default function Button({ id, isClicked, value, player, onClick }) {
  let buttonObj = { id, isClicked, value, player };
  const [state, setState] = useState(buttonObj);

  const handleClick = () => {
    const callbackResponse = onClick(state.id);
    setState((prevState) => {
      return { ...prevState, isClicked: true, ...callbackResponse };
    });
  };

  return (
    <button onClick={handleClick} disabled={state.isClicked}>
      {state.id.toString()}
      <br />
      {state.isClicked.toString()}
      <br />
      {state.player?.toString()}
      <br />
      <span style={styles.button}>{state.value}</span>
    </button>
  );
}
