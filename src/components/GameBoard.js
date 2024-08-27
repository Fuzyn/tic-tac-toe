import React from 'react';
import BoardSquare from './BoardSquare';
import {BoardContainer} from "./CustomComponents";

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