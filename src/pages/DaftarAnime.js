import React, { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import CardDaftarAnime from '../components/daftar_anime/CardDaftarAnime'

function DaftarAnime() {
    const [dataAnime, setDataAnime] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const [usersPerPage, setUsersPerPage] = useState(14)
    const [pageVisited, setPageVisited] = useState(pageNumber * usersPerPage)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        axios.get('https://yappstreamapi.herokuapp.com/films').then(res => {
            setDataAnime(res.data)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setPageCount(Math.ceil(dataAnime.length / usersPerPage))
    }, [dataAnime, pageVisited, usersPerPage, pageCount])

    const changePage = ({ selected }) => {
        setPageNumber(selected)
        setPageVisited(selected * usersPerPage)

    }
    const AnimeList = dataAnime.slice(pageVisited, pageVisited + usersPerPage).map((aniList) => (
        <CardDaftarAnime key={aniList._id} film={aniList} eid={aniList._id} coverImg={aniList.poster} title={aniList.title} no={aniList.episode.length} />
    ))

    return (
        <>
            <Header />
            {!loading ? (
                <div className='text-light pb-8 pt-24 min-h-screen'>
                    <div className="flex justify-between items-center px-6 lg:px-10">
                        <h1 className='pb-3 mb-8 pr-10 border-b-2 border-primary lg:text-2xl font-semibold'>Daftar Anime</h1>
                    </div>
                    <div className='flex flex-wrap gap-4 justify-center lg:justify-start lg:gap-8 px-4 lg:px-10'>
                        {AnimeList}
                        <ReactPaginate
                            previousLabel={<button className='pagination-button'> <ArrowLeftIcon className='w-4' /> <span>Prev</span></button>}
                            nextLabel={<button className='pagination-button'> <span>Next</span> <ArrowRightIcon className='w-4' /></button>}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName="paginationContainer"
                            disabledClassName="paginationDisable"
                            activeClassName="paginationActive"
                        />
                    </div>
                </div>
            ) : (
                <div className='w-full h-screen flex justify-center items-center text-lg text-light flex-col gap-2'>
                    <div className='text-xl lg:text-3xl font-bold text-primary'>Memuat Data</div>
                    <div className='text-sm lg:text-xl'>Tunggu sebentar ya ges...</div>
                </div>
            )}
        </>
    )
}

export default DaftarAnime