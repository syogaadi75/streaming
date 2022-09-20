import React, { useState } from 'react'
import '../components/anime_list/AnimeList.css'
import CardAnimeList from '../components/anime_list/CardAnimeList'
import { ArrowLeftIcon, ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

function TerakhirDitonton() {
    const dataHistory = useSelector(state => state.history.history)
    const history = useNavigate();
    const [sortAnimeList, setSortAnimeList] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [usersPerPage, setUsersPerPage] = useState(7)
    const [pageVisited, setPageVisited] = useState(pageNumber * usersPerPage)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        if (dataHistory.episodes) {
            const arrayForSort = [...dataHistory.episodes]
            const list = arrayForSort.sort((a, b) => {
                return new Date(b.insertAt) - new Date(a.insertAt)
            })
            setSortAnimeList(list)
            setPageCount(Math.ceil(dataHistory.episodes.length / usersPerPage))
        }
    }, [dataHistory])

    const changePage = ({ selected }) => {
        setPageNumber(selected)
        setPageVisited(selected * usersPerPage)

    }
    const AnimeList = sortAnimeList.slice(pageVisited, pageVisited + usersPerPage).map((aniList) => (
        <CardAnimeList key={aniList._id} film={aniList.film} eid={aniList._id} coverImg={aniList.film.poster} title={aniList.film.title} no={aniList.episode.no} />
    ))

    return (
        <>
            <Header />
            {dataHistory.episodes ? (
                <div className='px-10 pt-24 text-light pb-8 min-h-screen'>
                    <div className="flex justify-between items-center">
                        <h1 className='pb-3 mb-8 pr-10 border-b-2 border-primary lg:text-2xl font-semibold flex items-center space-x-2'>
                            <span>Terakhir Ditonton</span>
                        </h1>
                    </div>
                    <div className='flex flex-wrap gap-4 justify-center lg:justify-start lg:gap-8'>
                        {AnimeList.length == 0 ? (
                            <div className='flex flex-col mb-8'>
                                <div className='text-gray-300 mb-3'>Data tidak tersedia, silahkan menonton terlebih dahulu.</div>
                                <button className='button w-48' onClick={() => history('/daftar-anime')}><PlayIcon className='w-5' /> <span>Nonton Anime</span></button>
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
            ) : (
                <div className='w-full h-screen flex justify-center items-center text-lg text-light flex-col gap-2'>
                    <div className='text-xl lg:text-3xl font-bold text-primary'>Memuat Data</div>
                    <div className='text-sm lg:text-xl'>Tunggu sebentar ya ges...</div>
                </div>
            )}

        </>
    )
}

export default TerakhirDitonton