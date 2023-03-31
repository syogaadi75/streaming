import React, { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import CardDaftarAnime from '../components/daftar_anime/CardDaftarAnime'
import { useSelector } from 'react-redux'
import Loading from './Loading'

function DaftarAnime() {
    const [dataAnime, setDataAnime] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const [usersPerPage, setUsersPerPage] = useState(28)
    const [pageVisited, setPageVisited] = useState(pageNumber * usersPerPage)
    const [pageCount, setPageCount] = useState(0)
    const apiUrl = useSelector(state => state.api.apiUrl)

    useEffect(() => {
        const fetchData = async () => {
            const getFilms = await axios.get(apiUrl + '/films')
            setDataAnime(getFilms.data)
            setLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        setPageCount(Math.ceil(dataAnime.length / usersPerPage))
    }, [dataAnime, pageVisited, usersPerPage, pageCount])

    const changePage = ({ selected }) => {
        setPageNumber(selected)
        setPageVisited(selected * usersPerPage)

    }
    const AnimeList = dataAnime.slice(pageVisited, pageVisited + usersPerPage).map((aniList) => (
        <CardDaftarAnime
            key={aniList._id}
            film={aniList}
            eid={aniList._id}
            coverImg={aniList.poster}
            title={aniList.title.substring(0, 45)}
            no={aniList._id == '63255dbe9a82976b2983a6b7' ? aniList.episodeCount + 2 : aniList.episodeCount}
        />
    ))

    return (
        <div className='jost'>
            <Header />
            {!loading ? (
                <div className='text-light pb-8 pt-24 min-h-screen'>
                    <div className="flex justify-center items-center px-6 lg:px-10">
                        <h1 className='pb-1 mb-2 px-5 border-b-2 border-primary lg:text-2xl font-semibold text-center'>Daftar Anime</h1>
                    </div>
                    <div className='flex flex-wrap gap-4 justify-center lg:justify-start lg:gap-8 px-4 lg:px-10'>
                        <ReactPaginate
                            previousLabel={<button className='pagination-button'><ArrowLeftIcon className='w-4' /></button>}
                            nextLabel={<button className='pagination-button'><ArrowRightIcon className='w-4' /></button>}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            breakLabel="..."
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            containerClassName="paginationContainer"
                            disabledClassName="paginationDisable"
                            activeClassName="paginationActive"
                        />
                        {AnimeList}
                        <ReactPaginate
                            previousLabel={<button className='pagination-button'><ArrowLeftIcon className='w-4' /></button>}
                            nextLabel={<button className='pagination-button'><ArrowRightIcon className='w-4' /></button>}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            breakLabel="..."
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            containerClassName="paginationContainer"
                            disabledClassName="paginationDisable"
                            activeClassName="paginationActive"
                        />
                    </div>
                </div>
            ) : (
                <div className='w-full h-screen flex justify-center items-center text-lg text-light flex-col gap-2'>
                    <Loading />
                </div>
            )}
        </div>
    )
}

export default DaftarAnime