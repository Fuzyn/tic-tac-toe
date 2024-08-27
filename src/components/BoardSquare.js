import React from 'react';
import {SquareButton} from "./CustomComponents";

const BoardSquare = ({ value, onClick }) => {
    return (
        <SquareButton data-testid="square-button" onClick={onClick}>
            {value}
        </SquareButton>
    );
};

export default BoardSquare;