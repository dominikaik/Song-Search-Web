import FrontPage from '../components/FrontPage'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App';
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { GET_SONGS } from "../GraphQL/Queries";
import { Pagination, TableBody, TableCell, TableRow } from '@mui/material';

const mocks = [
  {
    request: {
      query: GET_SONGS,
      variables: {
        name: "Sad Forever"
      }
    },
    result: {
      data: {
        songs: { _id:"634b4ee3dad5dd1cb9c722c4", name:"Sad Forever", artists:"Lauv", year:"2020", danceability: "0.527", popularity:"71", duration:"203507" }
      }
    }
  }
];

// test if the title renders correctly
test('should render title', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(await screen.findByText("Spotify explorer")).toBeInTheDocument();
  });

  //tests if the search button renders correctly
  test('should render search button', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(await screen.findByText("Search")).toBeInTheDocument();
  });

  // tests if the search bar renders correctly
  test('should render search box', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  // tests if the sort-by drop-down menu renders correctly
  test('should render sort-by box', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const sortByElement = screen.getByText("Sort by");
    expect(sortByElement).toBeInTheDocument();
  });

  // tests if the order (asc/desc) drop-down menu renders correctly
  test('should render order-by box', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const orderByElement = screen.getByText("Order");
    expect(orderByElement).toBeInTheDocument();
  });

  // tests if the table renders correcly -> not working yet
  test('should render table', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(TableRow).toHaveLength(3);
  });

  // test input in the serach bar -> not working yet
/* describe('Input value', () => {
    it('updates on change', () => {
      const setSearch = jest.fn((value) => {})
      
      const { queryByPlaceholderText } = render(<FrontPage setSearch={setSearch}/>)
  
      const searchInput = queryByPlaceholderText('Search...')
  
      fireEvent.change(searchInput, { target: { value: 'test' } })
  
      expect(searchInput.value).toBe('test')
    })
}) */
