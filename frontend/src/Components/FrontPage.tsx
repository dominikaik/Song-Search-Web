import React from "react";
import { useQuery, gql } from '@apollo/client';

function FrontPage() {

const GET_SONGS = gql`
  query {
    getSongs{
        page
        totalPages
      }
  }
`;

  const { loading, error, data } = useQuery(GET_SONGS);
  

  console.log(data)
  if (loading) return <>null</>;
  if (error) return <>error</>;
    return (
        <>
        front
        {data.totalPages}
        </>
    );
  }
  
export default FrontPage; 
 

