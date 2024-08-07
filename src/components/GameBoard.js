import React from 'react';
import styled from 'styled-components';
import BoardSquare from './BoardSquare';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.size}, clamp(40px, 100px, 15vw))`};
  grid-template-rows: ${props => `repeat(${props.size}, clamp(40px, 100px, 15vw))`};
  gap: 5px;
`;

const GameBoard = ({ board, onClick, size }) => {
    return (
        <BoardContainer size={size}>
            {board.map((value, index) => (
                <BoardSquare
                    key={index}
                    value={value}
                    onClick={() => onClick(index)}
                />
            ))}
        </BoardContainer>
    );
};

export default GameBoard;