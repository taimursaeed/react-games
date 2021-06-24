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
  color: ${(props) => {
    if (props.player === TURNTYPE["PLAYER1"]) {
      return "#087108";
    } else if (props.player === TURNTYPE["PLAYER2"]) {
      return "#234e79";
    } else return "white";
  }};
  cursor: pointer;

  border-bottom: 0.25rem solid #f0f0f0;
  border-right: 0.25rem solid #f0f0f0;
  &:nth-child(3),
  &:nth-child(6),
  &:nth-child(9) {
    border-right: none;
  }
  &:nth-child(7),
  &:nth-child(8),
  &:nth-child(9) {
    border-bottom: none;
  }

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
