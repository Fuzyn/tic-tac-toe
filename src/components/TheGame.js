import React from 'react';
import { useMachine } from '@xstate/react';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import ResultBanner from "./ResultBanner";
import {gameMachine} from "./GameMachine";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 20px;
`;

const SizeButton = styled.button`
  padding: 10px;
  font-size: 20px;
  background: khaki;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
`

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
                <SizeButton onClick={() => handleResize(3)}>3 x 3</SizeButton>
                <SizeButton onClick={() => handleResize(4)}>4 x 4</SizeButton>
                <SizeButton onClick={() => handleResize(5)}>5 x 5</SizeButton>
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