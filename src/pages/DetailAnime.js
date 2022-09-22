import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { saveEpisodeId } from '../features/episodeSlice'

function DetailAnime() {
    const { id } = useParams()
    const [film, setFilm] = useState([])
    // const apiUrl = 'http://localhost:3000'
    const apiUrl = 'https://yappstreamapi.herokuapp.com'
    const dispatch = useDispatch()
    const history = useNavigate();

    useEffect(() => {
        axios.get(apiUrl + '/films/' + id).then(res => {
            setFilm(res.data)
        })
    }, [])

    const tonton = (eid) => {
        dispatch(saveEpisodeId(eid))
        history('/watch')
    }


    return (
        <>
            {film.film ? (
                <div className='flex min-h-screen lg:h-screen bg-dark text-light py-24 px-8 lg:py-28 lg:px-14 gap-8 flex-col lg:flex-row'>
                    <Header />
                    <div className='flex items-start gap-8 flex-col lg:flex-row'>
                        <div className='w-full flex justify-center'>
                            <img className='w-[200px] lg:w-[300px] max-w-[200px] lg:max-w-[300px]' src={film.film?.poster} alt="Poster" />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold mb-4'>{film.film?.title}</h2>
                            <p className='mb-6 text-gray-300 text-xs lg:text-sm'>{film.film?.synopsis}</p>
                            <div className='flex flex-wrap gap-2 mb-10'>
                                {film.film?.category.map((cat) => (
                                    <span key={cat} className='px-3 py-2 font-semibold bg-dark shadow-xl shadow-black/30 text-primary text-sm'>{cat}</span>
                                ))}
                            </div>
                            <div className='flex mb-4 items-center gap-2'><span>Episode Terakhir</span> : <span className='text-primary text-xl font-semibold'>{film.episodes && film.episodes[0].no}</span> </div>
                            <div className='flex gap-4'>
                                <button onClick={() => tonton(film.episodes && film.episodes[film.episodes.length - 1]._id)} className='button text-sm lg:text-base'>Tonton Eps {film.episodes && film.episodes[film.episodes.length - 1].no} </button>
                                <button onClick={() => tonton(film.episodes && film.episodes[0]._id)} className='button text-sm lg:text-base'>Tonton Eps {film.episodes && film.episodes[0].no} </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <h2 className='text-xl font-bold mb-4'>List Episode</h2>
                        <div className='overflow-y-auto h-[300px] lg:h-full scrollbar-hide border-t-2 border-b-2 border-primary pt-2'>
                            {film.episodes?.map(episode => (
                                <button onClick={() => tonton(episode._id)} key={episode.no} className='px-3 py-2 bg-dark text-gray-300 rounded shadow-2xl hover:bg-primary hover:text-dark hover:shadow-black/90 flex space-x-1 items-center  transition-all duration-300 ease-linear w-full mb-2 group text-sm'>
                                    {film.film?.title} <span className='text-primary mx-2 group-hover:text-dark'>-</span> Episode {episode.no}
                                </button>
                            ))}
                        </div>
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

export default DetailAnime