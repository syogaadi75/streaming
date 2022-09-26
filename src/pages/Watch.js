import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../components/watch/Watch.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon, Bars3Icon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import { saveHistory } from '../features/historySlice'

function Watch() {
    const apiUrl = useSelector(state => state.api.apiUrl)
    const video = useRef(null)
    const [data, setData] = useState([])
    const [firstLoad, setFirstLoad] = useState(true)
    const [loading, setLoading] = useState(false)
    const [nextEpisode, setNextEpisode] = useState([])
    const [prevEpisode, setPrevEpisode] = useState([])
    const { id } = useParams()
    const history = useNavigate()
    const dispatch = useDispatch()
    const myHistory = useSelector(state => state.history.history)

    const addHistory = (eid) => {
        axios.put(apiUrl + '/histories/' + myHistory._id, { episode: eid }).then(res => {
            axios.get(apiUrl + '/histories/' + myHistory.ip).then(resHistory => {
                dispatch(saveHistory(resHistory.data))
            })
        })
    }

    useEffect(() => {
        if (id) {
            axios.get(apiUrl + '/episode/' + id).then(res => {
                setData(res.data)
                var x = 0
                if (
                    res.data.episode._id == '632acffad4346cff27f04b1c'
                    || res.data.episode._id == '632ac243d4346cff27f04980'
                    || res.data.episode._id == '632ad71bd4346cff27f04be6'
                ) {
                    x = 2
                } else {
                    x = 1
                }

                axios.get(`${apiUrl}/episode/cariNo/${res.data.film._id}/${res.data.episode.no + x}`).then(resNext => {
                    axios.get(`${apiUrl}/episode/cariNo/${res.data.film._id}/${res.data.episode.no + -x}`).then(resPrev => {
                        addHistory(res.data.episode._id)
                        setNextEpisode(resNext.data)
                        setPrevEpisode(resPrev.data)
                        video.current.load()
                        setLoading(false)
                    })
                })
            })
        }
    }, [id])

    const changeEps = (eid) => {
        setFirstLoad(false)
        history('/watch/' + eid)
        setLoading(true)
    }

    return (
        <>
            <Header />
            {data.length == 0 ? (
                <div className='w-full h-screen flex justify-center items-center text-lg text-light flex-col gap-2'>
                    <div className='text-xl lg:text-3xl font-bold text-primary'>Memuat Video</div>
                    <div className='text-sm lg:text-xl'>Tunggu sebentar ya ges...</div>
                </div>
            ) : (
                <div className='text-light w-full flex space-y-8 lg:space-x-8 p-8 lg:p-16 flex-col lg:flex-row min-h-screen'>
                    <div className='mt-14 lg:mt-8'>
                        <h1 className='mb-4 flex flex-col items-start lg:flex-row lg:items-center gap-4'>
                            <button className='button text-base' onClick={() => history('/')}> <HomeIcon className='w-5' /> <span>Kembali</span></button>
                            <span className='text-base lg:text-lg'>
                                {data.film.title} - <span>Episode </span>
                                {
                                    data.episode._id == '632acffad4346cff27f04b1c'
                                        || data.episode._id == '632ac243d4346cff27f04980'
                                        || data.episode._id == '632ad71bd4346cff27f04be6' ? data.episode.no + '-' + parseInt(data.episode.no + 1) : data.episode.no
                                }
                            </span>
                        </h1>
                        <div className='mb-6 text-xs lg:text-base'>
                            <span className='font-bold text-primary'>Penting!</span> Jika video tidak dapat diputar, silahkan gunakan <span className='font-bold text-primary'>CHROME</span> browser.
                        </div>
                        <video ref={video} className='w-[500px] lg:w-[620px]' controls>
                            <source src={data.episode.video} type="video/mp4" />
                        </video>
                        <div className='flex justify-between mt-4 text-xs lg:text-base mb-2'>
                            {prevEpisode.error ? (
                                <button className='button-disable'><XMarkIcon className='w-5' /> <span>Prev Eps</span> </button>
                            ) : (
                                <>
                                    {loading ? (
                                        <button className='button-disable'><ArrowPathIcon className='w-5' /> <span>Loading</span> </button>
                                    ) : (
                                        <button className='button' onClick={() => changeEps(prevEpisode.episode._id)}> <ArrowLeftIcon className='w-5' /> <span>Prev Eps</span></button>
                                    )}
                                </>
                            )}
                            <button className='button' onClick={() => history('/detail-anime/' + data.film._id)}> <Bars3Icon className='w-5' /> <span>All Eps</span></button>
                            {nextEpisode.error ? (
                                <button className='button-disable'><span>Next Eps</span> <XMarkIcon className='w-5' /> </button>
                            ) : (
                                <>
                                    {loading ? (
                                        <button className='button-disable'><ArrowPathIcon className='w-5' /> <span>Loading</span> </button>
                                    ) : (
                                        <button className='button' onClick={() => changeEps(nextEpisode.episode._id)}><span>Next Eps</span> <ArrowRightIcon className='w-5' /> </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-14 lg:mt-8 flex w-full lg:w-1/3 flex-col space-y-3">
                        <h1 className='text-lg lg:text-2xl font-bold text-primary cursor-pointer' onClick={() => history('/detail-anime/' + data.film._id)}>{data.film.title}</h1>
                        <div className='flex flex-row space-x-6 cursor-pointer' onClick={() => history('/detail-anime/' + data.film._id)}>
                            <img className='w-32 lg:w-44 h-32 lg:h-44' src={data.film.poster} alt="Cover" />
                            <p className='text-xs lg:text-sm leading-tight text-gray-300'>
                                {`${data.film.synopsis.substring(0, 220)}...`}
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-2 '>
                            {data.film.category.map((cat) => (
                                <span key={cat} className='px-3 py-2 font-semibold bg-dark shadow-xl shadow-black/30 text-primary text-sm'>{cat}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Watch