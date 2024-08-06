import React from 'react';
import { useMachine } from '@xstate/react';
import {assign, createMachine} from 'xstate';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import {winPossibilities} from "./CommonHandlers";
import ResultBanner from "./ResultBanner";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const gameMachine = createMachine({
    id: 'the-game',
    initial: 'playing',
    context: {
        board: Array(9).fill(null),
        currentPlayer: 'X',
    },
    states: {
        playing: {
            on: {
                MAKE_MOVE: {
                    actions: 'makeMove',
                    target: 'evaluate'
                }
            }
        },
        evaluate: {
            always: [
                { target: 'won', guard: 'isWinningMove' },
                { target: 'draw', guard: 'isDraw' },
                { target: 'playing', actions: 'switchPlayer' }
            ]
        },
        won: {
            on: {
                RESET_GAME: { actions: 'resetGame', target: 'playing' }
            }
        },
        draw: {
            on: {
                RESET_GAME: { actions: 'resetGame', target: 'playing' }
            }
        }
    }
}, {
    actions: {
        makeMove: assign({
            board: (context) => {
                if (context.context.board[context.event.index] !== null) return context.context.board;

                const newBoard = [...context.context.board];
                newBoard[context.event.index] = context.context.currentPlayer;
                return newBoard;
            }
        }),
        switchPlayer: assign({
            currentPlayer: (context) => (context.context.currentPlayer === 'X' ? 'O' : 'X')
        }),
        resetGame: assign({
            board: () => Array(9).fill(null),
            currentPlayer: () => 'X'
        }),
    },
    guards: {
        canMakeMove: (context) => {
            return context.context.board[context.event.index] === null;
        },
        isWinningMove: (context) => {
            const { board, currentPlayer } = context.context;

            return winPossibilities.some((pattern) => {
                const [a, b, c] = pattern;
                return (
                    board[a] === currentPlayer &&
                    board[b] === currentPlayer &&
                    board[c] === currentPlayer
                );
            });
        },
        isDraw: (context) => {
            return context.context.board.every(cell => cell !== null);
        }
    }
});

const TheGame = () => {
    const [state, send] = useMachine(gameMachine);

    const handleClick = (index) => {
        if (state.context.board[index] === null && state.matches('playing')) {
            send({ type: 'MAKE_MOVE', index });
        }
    };

    return (
        <GameContainer>
            <h1>Tic-Tac-Toe Game</h1>
            <h3>Current Player: {state.context.currentPlayer === 'X' ? 'X' : 'O'}</h3>
            <GameBoard board={state.context.board} onClick={handleClick} />
            <ResultBanner state={state} onResetGame={() => send({ type: 'RESET_GAME' })}/>
        </GameContainer>
    );
};

export default TheGame;