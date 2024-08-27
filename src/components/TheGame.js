import React from 'react';
import { useMachine } from '@xstate/react';
import GameBoard from './GameBoard';
import ResultBanner from "./ResultBanner";
import {gameMachine} from "./GameMachine";
import {CustomButton, GameContainer} from "./CustomComponents";

const TheGame = () => {
    const [state, send] = useMachine(gameMachine);

    const handleClick = (index) => {
        if (state.context.board[index] === null && state.matches('playing')) {
            send({ type: 'MAKE_MOVE', index });
        }
    };

    const handleResize = (size) => {
        send({ type: 'RESIZE', size });
    }

    return (
        <GameContainer>
            <h1 align='center'>Tic-Tac-Toe Game</h1>
            <div>
                <CustomButton onClick={() => handleResize(3)}>3 x 3</CustomButton>
                <CustomButton onClick={() => handleResize(4)}>4 x 4</CustomButton>
                <CustomButton onClick={() => handleResize(5)}>5 x 5</CustomButton>
            </div>
            <h3>Current Player: {state.context.currentPlayer === 'X' ? 'X' : 'O'}</h3>
            <GameBoard
                board={state.context.board}
                onClick={handleClick}
                size={state.context.size}
            />
            <p>{state.context.size} characters must be in one line</p>
            {(state.matches('won') || state.matches('draw')) && <ResultBanner state={state} onResetGame={() => send({type: 'RESET_GAME'})}/>}
        </GameContainer>
    );
};

export default TheGame;