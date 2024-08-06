import React from 'react';
import styled from 'styled-components';
import BoardSquare from './BoardSquare';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
`;

const GameBoard = ({ board, onClick }) => {
    return (
        <BoardContainer>
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