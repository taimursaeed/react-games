import React from "react";
import styled from "styled-components";
import { TURNTYPE } from "./../constants";

const GridButton = styled.button`
  font-size: 45px;
  line-height: 45px;
  border: none;
  background: ${(props) => {
    if (props.player === TURNTYPE["PLAYER1"]) {
      return "#07bc07";
    } else if (props.player === TURNTYPE["PLAYER2"]) {
      return "#007eff";
    } else return "white";
  }};
  cursor: pointer;
  border: 1px solid #ccc;
  svg {
    vertical-align: middle;
  }
  &:not([disabled]):hover {
    background: #2fd22f;
  }
  &:disabled {
    &:hover {
      cursor: initial;
    }
  }
`;
export default function Button({ id, isClicked, value, onClick, player }) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <GridButton onClick={handleClick} disabled={isClicked} player={player}>
      {value}
    </GridButton>
  );
}
