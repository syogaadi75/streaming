import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { saveEpisodeId } from '../features/episodeSlice'
import Loading from './Loading'

function DetailAnime() {
    const { id } = useParams()
    const [film, setFilm] = useState([])
    const apiUrl = useSelector(state => state.api.apiUrl)
    const dispatch = useDispatch()
    const history = useNavigate();

    useEffect(() => {
        axios.get(apiUrl + '/films/' + id).then(res => {
            setFilm(res.data)
        })
    }, [])

    const tonton = (eid) => {
        history('/watch/' + eid)
    }


    return (
        <div className='jost'>
            {film.film ? (
                <div className='flex min-h-screen bg-dark text-light py-24 px-8 lg:py-28 lg:px-14 gap-8 flex-col lg:flex-row'>
                    <Header />
                    <div className='flex items-start gap-8 flex-col lg:flex-row w-full'>
                        <div className='w-full flex justify-center relative'>
                            <div className='w-full h-[80px] absolute top-[-1px] bg-merges-top'></div>
                            <div className='w-full h-[80px] absolute bottom-[-1px] bg-merges-bottom'></div>
                            <div className='h-full w-[120px] lg:w-[50px] absolute right-[-1px] bg-merges-right'></div>
                            <div className='h-full w-[120px] lg:w-[50px] absolute left-[-1px] bg-merges-left'></div>
                            <img className='w-[200px] lg:w-[300px] max-w-[200px] lg:max-w-[300px]' src={film.film?.poster} alt="Poster" />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold mb-4 text-primary text-center lg:text-left'>{film.film?.title}</h2>
                            <p className='mb-6 text-gray-300 text-xs lg:text-sm text-justify'>{film.film?.synopsis}</p>
                            <div className='flex flex-wrap gap-2 mb-10'>
                                {film.film?.category.map((cat) => (
                                    <span key={cat} className='px-3 py-2 font-semibold bg-dark shadow-xl shadow-black/30 text-primary text-sm'>{cat}</span>
                                ))}
                            </div>
                            <div className='flex mb-4 items-center gap-2'><span>Episode Terakhir</span> : <span className='text-primary text-xl font-semibold'>{film.episodes && film.episodes[0]?.no}</span> </div>
                            <div className='flex gap-4'>
                                <button onClick={() => tonton(film.episodes && film.episodes[film.episodes.length - 1]._id)} className='button text-sm lg:text-base'>Tonton Eps {film.episodes && film.episodes[film.episodes.length - 1]?.no} </button>
                                <button onClick={() => tonton(film.episodes && film.episodes[0]._id)} className='button text-sm lg:text-base'>Tonton Eps {film.episodes && film.episodes[0]?.no} </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className='flex flex-col w-full lg:w-[600px]'>
                        <h2 className='text-xl font-bold mb-4 border-b border-primary w-[150px] pb-2'>List Episode</h2>
                        <div className='overflow-y-auto h-[300px] xs:scrollbar-hide pt-2'>
                            {film.episodes?.map(episode => (
                                <button onClick={() => tonton(episode._id)} key={episode.no} className='px-3 py-2 bg-dark text-gray-300 rounded shadow-2xl hover:bg-primary hover:text-dark hover:shadow-black/90 flex space-x-1 items-center transition-all duration-300 ease-linear w-full mb-2 group text-sm text-left'>
                                    <span>
                                        {film.film?.title.substring(0, 35)}
                                    </span>
                                    <div className='text-primary group-hover:text-dark text-xs font-semibold'> - {episode.no}</div>
                                </button>
                            ))}
                        </div>
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

export default DetailAnime