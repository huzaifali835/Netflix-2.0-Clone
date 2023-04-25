import React from 'react'
import './HomeScreen.css';
import Row from '../components/Row/Row';
import requests from '../Requests';
import Banner from '../components/Banner/Banner'
import Nav from '../components/Nav/Nav';

function HomeScreen() {
  return (
    <div className='homeScreen'>
        <Nav/>
        <Banner/>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  )
}

export default HomeScreen