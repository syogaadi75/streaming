import React, { useState } from 'react'
import './AnimeList.css'
import CardAnimeList from './CardAnimeList'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function AnimeList() {
    const [dataAnime, setDataAnime] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const [usersPerPage, setUsersPerPage] = useState(14)
    const [pageVisited, setPageVisited] = useState(pageNumber * usersPerPage)
    const [pageCount, setPageCount] = useState(0)
    const apiUrl = useSelector(state => state.api.apiUrl)

    useEffect(() => {
        axios.get(apiUrl + '/episode').then(res => {
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
        <CardAnimeList
            key={aniList._id}
            film={aniList.film[0]}
            eid={aniList._id}
            coverImg={aniList.film[0].poster}
            title={aniList.film[0].title}
            no={
                aniList._id == '632acffad4346cff27f04b1c'
                    || aniList._id == '632ac243d4346cff27f04980'
                    || aniList._id == '632ad71bd4346cff27f04be6' ? aniList.no + '-' + parseInt(aniList.no + 1) : aniList.no
            } />
    ))

    return (
        <div className='p-4 lg:p-10 pt-10 text-light pb-8'>
            <div className="flex justify-between items-center">
                <h1 className='pb-3 mb-8 pr-10 border-b-2 border-primary lg:text-2xl font-semibold'>Anime Terbaru Subtitle Indonesia</h1>
            </div>
            <div className='flex flex-wrap gap-4 justify-center lg:gap-8'>
                {loading ? (
                    <div>
                        Memuat data...
                    </div>
                ) : AnimeList}
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
    )
}

export default AnimeList