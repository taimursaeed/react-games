import React, { useState } from "react";

const styles = {
  button: {
    fontSize: "30px",
  },
};
export default function Button({ id, isClicked, value, player, onClick }) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <button onClick={handleClick} disabled={isClicked}>
      {id?.toString()}
      <br />
      {isClicked?.toString()}
      <br />
      {player?.toString()}
      <br />
      <span style={styles.button}>{value}</span>
    </button>
  );
}
