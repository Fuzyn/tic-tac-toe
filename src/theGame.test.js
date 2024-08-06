import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TheGame from "./components/TheGame";

describe('Game component', () => {
    it('Renders the game board with 9 fields', () => {
        const { getAllByTestId } = render(<TheGame />);
        const cells = getAllByTestId('square-button');
        expect(cells.length).toBe(9);
    });

    it('Allows players to make moves', () => {
        const { getByText, getAllByTestId } = render(<TheGame />);
        const cells = getAllByTestId('square-button');

        fireEvent.click(cells[0]);
        expect(cells[0].textContent).toBe('X');
        expect(getByText(/Current Player: O/)).toBeInTheDocument();

        fireEvent.click(cells[1]);
        expect(cells[1].textContent).toBe('O');
        expect(getByText(/Current Player: X/)).toBeInTheDocument();
    });

    it('Declares the winner correctly (X win)', () => {
        const { getAllByTestId, getByText, getByTestId } = render(<TheGame />);
        const cells = getAllByTestId('square-button');

        fireEvent.click(cells[0]);
        fireEvent.click(cells[3]);
        fireEvent.click(cells[1]);
        fireEvent.click(cells[4]);
        fireEvent.click(cells[2]);

        const banner = getByTestId('banner');
        expect(banner).toBeInTheDocument();
        expect(banner.textContent).toContain('Player X WIN!');

        const resetButton = getByText('Reset');
        expect(resetButton).toBeInTheDocument();
    });

    it('Declares the winner correctly (O win)', () => {
        const { getAllByTestId, getByText, getByTestId } = render(<TheGame />);
        const cells = getAllByTestId('square-button');

        fireEvent.click(cells[3]);
        fireEvent.click(cells[0]);
        fireEvent.click(cells[4]);
        fireEvent.click(cells[1]);
        fireEvent.click(cells[7]);
        fireEvent.click(cells[2]);

        const banner = getByTestId('banner');
        expect(banner).toBeInTheDocument();
        expect(banner.textContent).toContain('Player O WIN!');

        const resetButton = getByText('Reset');
        expect(resetButton).toBeInTheDocument();
    });

    it('Declares a draw correctly', () => {
        const { getAllByTestId, getByText, getByTestId } = render(<TheGame />);
        const cells = getAllByTestId('square-button');

        fireEvent.click(cells[0]);
        fireEvent.click(cells[1]);
        fireEvent.click(cells[2]);
        fireEvent.click(cells[4]);
        fireEvent.click(cells[3]);
        fireEvent.click(cells[5]);
        fireEvent.click(cells[7]);
        fireEvent.click(cells[6]);
        fireEvent.click(cells[8]);

        const banner = getByTestId('banner');
        expect(banner).toBeInTheDocument();
        expect(banner.textContent).toContain('Draw!');

        const resetButton = getByText('Reset');
        expect(resetButton).toBeInTheDocument();
    });

    it('Resets the game correctly', () => {
        const { getAllByTestId, getByText, getByTestId } = render(<TheGame />);
        const cells = getAllByTestId('square-button');

        fireEvent.click(cells[3]);
        fireEvent.click(cells[0]);
        fireEvent.click(cells[4]);
        fireEvent.click(cells[1]);
        fireEvent.click(cells[7]);
        fireEvent.click(cells[2]);

        const banner = getByTestId('banner');
        expect(banner).toBeInTheDocument();
        expect(banner.textContent).toContain('Player O WIN!');

        const resetButton = getByText('Reset');
        expect(resetButton).toBeInTheDocument();

        fireEvent.click(resetButton);
        cells.forEach(cell => {
            expect(cell.textContent).toBe('');
        });
        expect(getByText(/Current Player: X/)).toBeInTheDocument();
    });
});