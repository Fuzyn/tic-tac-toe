import React from 'react';
import styled, {keyframes} from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SquareButton = styled.button`
  width: clamp(40px, 100px, 15vw);
  height: clamp(40px, 100px, 15vw);
  font-size: 34px;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  animation: ${fadeIn} 1s ease-out;
`;

const BoardSquare = ({ value, onClick }) => {
    return (
        <SquareButton data-testid="square-button" onClick={onClick}>
            {value}
        </SquareButton>
    );
};

export default BoardSquare;