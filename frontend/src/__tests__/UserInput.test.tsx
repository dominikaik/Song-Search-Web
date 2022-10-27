import FrontPage from '../components/FrontPage'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App';

test('renders search box', () => {
    render(<App />);
    const searchElement = screen.getByLabelText(/Search for a song or artist/i);
    expect(searchElement).toBeInTheDocument();
  });

test('renders sort-by box', () => {
  render(<App />);
  const sortByElement = screen.getByLabelText(/Sort by/i);
  expect(sortByElement).toBeInTheDocument();
});

test('renders order-by box', () => {
  render(<App />);
  const orderByElement = screen.getByLabelText(/Order by/i);
  expect(orderByElement).toBeInTheDocument();
});


/* describe('Input value', () => {
    it('updates on change', () => {
      const setSearch = jest.fn((value) => {})
      
      const { queryByPlaceholderText } = render(<FrontPage setSearch={setSearch}/>)
  
      const searchInput = queryByPlaceholderText('Search...')
  
      fireEvent.change(searchInput, { target: { value: 'test' } })
  
      expect(searchInput.value).toBe('test')
    })
}) */
