import {assign, createMachine} from "xstate";
import {winPossibilities3, winPossibilities4, winPossibilities5} from "./CommonHandlers";

export const gameMachine = createMachine({
    id: 'the-game',
    initial: 'playing',
    context: {
        size: 3,
        board: Array(9).fill(null),
        currentPlayer: 'X',
    },
    states: {
        playing: {
            on: {
                MAKE_MOVE: {
                    actions: 'makeMove',
                    target: 'evaluate'
                },
                RESIZE: {
                    actions: 'resizeBoard'
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
            board: (context) => Array(Math.pow(context.context.size, 2)).fill(null),
            currentPlayer: () => 'X'
        }),
        resizeBoard: assign({
            size: context => context.event.size,
            board: (context) => Array(Math.pow(context.event.size, 2)).fill(null),
            currentPlayer: () => 'X'
        }),
    },
    guards: {
        canMakeMove: (context) => {
            return context.context.board[context.event.index] === null;
        },
        isWinningMove: (context) => {
            const { board, currentPlayer, size } = context.context;

            if (size === 3) {
                return winPossibilities3.some((pattern) => {
                    const [a, b, c] = pattern;
                    return (
                        board[a] === currentPlayer &&
                        board[b] === currentPlayer &&
                        board[c] === currentPlayer
                    );
                });
            } else if (size === 4) {
                return winPossibilities4.some((pattern) => {
                    const [a, b, c, d] = pattern;
                    return (
                        board[a] === currentPlayer &&
                        board[b] === currentPlayer &&
                        board[c] === currentPlayer &&
                        board[d] === currentPlayer
                    );
                });
            } else if (size === 5) {
                return winPossibilities5.some((pattern) => {
                    const [a, b, c, d, e] = pattern;
                    return (
                        board[a] === currentPlayer &&
                        board[b] === currentPlayer &&
                        board[c] === currentPlayer &&
                        board[d] === currentPlayer &&
                        board[e] === currentPlayer
                    );
                });
            }
        },
        isDraw: (context) => {
            return context.context.board.every(cell => cell !== null);
        }
    }
});