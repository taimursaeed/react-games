import React from "react";
import styled from "styled-components";

const GridButton = styled.button`
  font-size: 30px;
  line-height: 30px;
  border: none;
  background: white;
  cursor: pointer;
  border: 1px solid #ccc;
  svg {
    vertical-align: middle;
  }
  &:hover {
    background: #fafafa;
  }
  &:disabled {
    &:hover {
      background: white;
      cursor: initial;
    }
  }
`;
export default function Button({ id, isClicked, value, onClick }) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <GridButton onClick={handleClick} disabled={isClicked}>
      {value}
    </GridButton>
  );
}
