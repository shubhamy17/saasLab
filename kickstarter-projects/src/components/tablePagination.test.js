import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TablePagination from './tablePagination';
import axios from 'axios';

// Mock axios to prevent actual API calls
jest.mock('axios');

describe('TablePagination Component', () => {
    const mockData = [
        { "percentage.funded": "50%", "amt.pledged": "$1000" },
        { "percentage.funded": "75%", "amt.pledged": "$1500" },
    ];

    it('renders table with data', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<TablePagination />);

        await waitFor(() => screen.getByText("50%"));

        expect(screen.getByText("50%")).toBeInTheDocument();
        expect(screen.getByText("$1000")).toBeInTheDocument();
    });

    it('handles pagination correctly', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<TablePagination />);

        await waitFor(() => screen.getByText("50%"));

        const nextPageButton = screen.getByText('>');

        fireEvent.click(nextPageButton);

        expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it('disables prev button on first page', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<TablePagination />);

        await waitFor(() => screen.getByText("50%"));

        const prevPageButton = screen.getByText('<');
        expect(prevPageButton).toBeDisabled();
    });

    it('displays correct rows per page', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<TablePagination />);

        await waitFor(() => screen.getByText("50%"));

        const rowsPerPageSelect = screen.getByLabelText('Rows per page:');
        fireEvent.change(rowsPerPageSelect, { target: { value: '10' } });

        expect(rowsPerPageSelect.value).toBe('10');
    });
});
