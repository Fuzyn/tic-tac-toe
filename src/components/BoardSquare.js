import React from 'react';
import styled from 'styled-components';

const SquareButton = styled.button`
  width: 100px;
  height: 100px;
  font-size: 34px;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const BoardSquare = ({ value, onClick }) => {
    return (
        <SquareButton onClick={onClick}>
            {value}
        </SquareButton>
    );
};

export default BoardSquare;