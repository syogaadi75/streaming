import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../components/watch/Watch.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon, Bars3Icon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import { saveHistory } from '../features/historySlice'
import Loading from './Loading'
import { Player, FullscreenToggle, ControlBar, Shortcut, BigPlayButton, ProgressControl, CurrentTimeDisplay, DurationDisplay, TimeDivider } from 'video-react';
import 'video-react/dist/video-react.css'

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

    const addHistory = async (eid) => {
        const putHistory = await axios.put(apiUrl + '/histories/' + myHistory._id, { episode: eid })
        const getHistory = await axios.get(apiUrl + '/histories/' + myHistory.ip)
        await dispatch(saveHistory(getHistory.data))
    }

    useEffect(() => {
        const fetchData = async () => {
            const getEpisode = await axios.get(apiUrl + '/episode/' + id)

            setData(getEpisode.data)
            addHistory(getEpisode.data.episode._id)
            await video.current?.load()

            const nextEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + 1}`)
            const prevEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + -1}`)

            setNextEpisode(nextEpisode.data)
            setPrevEpisode(prevEpisode.data)

            if (nextEpisode.data.error) {
                const nextTwoEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + 2}`)
                if (!nextTwoEpisode.data.error) {
                    nextTwoEpisode.data.doubleEps = true
                }
                setNextEpisode(nextTwoEpisode.data)
            }

            if (prevEpisode.data.error) {
                const prevTwoEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + -2}`)
                setPrevEpisode(prevTwoEpisode.data)
            }

            setLoading(false)
        }

        fetchData()

    }, [id])

    const changeEps = async (eid) => {
        video.current.pause()
        setFirstLoad(false)
        history('/watch/' + eid)
        setLoading(true)
    }

    return (
        <>
            <Header />
            {data.length == 0 ? (
                <div className='w-full h-screen flex justify-center items-center text-lg text-light flex-col gap-2'>
                    <Loading />
                </div>
            ) : (
                <div className='text-light w-full flex space-y-8 lg:space-x-8 p-8 lg:p-16 flex-col lg:flex-row min-h-screen'>
                    <div className='mt-14 lg:mt-8'>
                        <h1 className='mb-4 flex flex-col items-start lg:flex-row lg:items-center gap-4'>
                            <button
                                data-aos-once="false"
                                data-aos="fade-right"
                                data-aos-offset="200"
                                data-aos-delay="0"
                                data-aos-duration="500"
                                data-aos-easing="ease-in-out"
                                className='button text-base' onClick={() => history('/')}
                            >
                                <HomeIcon className='w-5' /> <span>Kembali</span>
                            </button>
                            <span
                                data-aos-once="false"
                                data-aos="fade-right"
                                data-aos-offset="200"
                                data-aos-delay="300"
                                data-aos-duration="800"
                                data-aos-easing="ease-in-out"
                                className='text-base lg:text-lg'
                            >
                                {data.film.title.substring(0, 40)} - <span>Episode </span>
                                {
                                    nextEpisode.doubleEps ? data.episode.no + " & " + parseInt(data.episode.no + 1) : data.episode.no
                                }
                            </span>
                        </h1>
                        <div
                            data-aos-once="false"
                            data-aos="fade-right"
                            data-aos-offset="200"
                            data-aos-delay="0"
                            data-aos-duration="800"
                            data-aos-easing="ease-in-out"
                            className='mb-6 text-xs lg:text-base'
                        >
                            <span className='font-bold text-primary'>Penting!</span> Jika video tidak dapat diputar, silahkan gunakan <span className='font-bold text-primary'>CHROME</span> browser.
                        </div>
                        <div className='flex justify-center'>
                            <Player
                                ref={video}
                            >
                                <source src={data.episode.video} />
                                <BigPlayButton className='big-play-button-hide' />
                                <ControlBar>
                                    {/* <PlayToggle /> */}
                                    <CurrentTimeDisplay key="ctd" />
                                    <DurationDisplay key="dd" />
                                    <ProgressControl key="pc" />
                                    <TimeDivider key="td" />
                                    <FullscreenToggle key="fs" />
                                </ControlBar>
                            </Player>
                            {/* <video ref={video} className='w-[500px] lg:w-[620px]' controls>
                                <source src={data.episode.video} type="video/mp4" />
                            </video> */}
                        </div>
                        <div className='flex justify-between mt-4 text-xs lg:text-base mb-2'>
                            <div>
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
                            </div>
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
                    <div
                        className="mt-14 lg:mt-8 flex w-full lg:w-1/3 flex-col space-y-3"
                    >
                        <h1 className='text-lg lg:text-xl font-bold text-primary cursor-pointer' onClick={() => history('/detail-anime/' + data.film._id)}>{data.film.title}</h1>
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