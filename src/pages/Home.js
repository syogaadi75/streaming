import React from 'react'
import AnimeList from '../components/anime_list/AnimeList'
import Welcome from '../components/welcome/Welcome'
import Header from '../components/Header'

function Home() {
    return (
        <>
            <Header />
            <Welcome />
            <AnimeList />
        </>
    )
}

export default Home