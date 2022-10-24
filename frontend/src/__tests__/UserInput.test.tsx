import Search from '../components/UserInput'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('renders search box', () => {
    render(<Search />);
    const searchElement = screen.getByLabelText(/What are you searching for?/i);
    expect(searchElement).toBeInTheDocument();
  });

describe('Input value', () => {
    it('updates on change', () => {
      const setSearch = jest.fn((value) => {})
      
      const { queryByPlaceholderText } = render(<Search setSearch={setSearch}/>)
  
      const searchInput = queryByPlaceholderText('Search...')
  
      fireEvent.change(searchInput, { target: { value: 'test' } })
  
      expect(searchInput.value).toBe('test')
    })
})
