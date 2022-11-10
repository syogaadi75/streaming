import React, { useState } from 'react'
import './AnimeList.css'
import CardAnimeList from './CardAnimeList'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Loading from '../../pages/Loading'

function AnimeList() {
    const [dataAnime, setDataAnime] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const [usersPerPage, setUsersPerPage] = useState(14)
    const [pageVisited, setPageVisited] = useState(pageNumber * usersPerPage)
    const [pageCount, setPageCount] = useState(0)
    const apiUrl = useSelector(state => state.api.apiUrl)

    useEffect(() => {
        const fetchData = async () => {
            const getEpisode = await axios.get(apiUrl + '/episode')
            await setDataAnime(getEpisode.data)
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
        <CardAnimeList
            key={aniList._id}
            film={aniList.film[0]}
            eid={aniList._id}
            coverImg={aniList.film[0].poster}
            title={aniList.film[0].title.substring(0, 45)}
            no={aniList.no} />
    ))

    return (
        <div className='p-4 lg:p-10 pt-10 text-light pb-8'>
            <div className="flex justify-between items-center">
                <h1 className='pb-3 mb-8 pr-10 border-b-2 border-primary lg:text-2xl font-semibold'>Anime Terbaru Subtitle Indonesia</h1>
            </div>
            <div className='flex flex-wrap gap-4 justify-center lg:gap-8'>
                {loading ? (
                    <Loading />
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