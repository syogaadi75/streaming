import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../components/watch/Watch.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon, Bars3Icon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import { saveHistory } from '../features/historySlice'
import Loading from './Loading'
import VideoJS from '../lib/videojs/VideoJS'
import BVideo from '../lib/bvideo/BVideo'

function Watch() {
    const apiUrl = useSelector(state => state.api.apiUrl)
    const playerRef = useRef(null)
    const [data, setData] = useState([])
    const [activeServer, setActiveServer] = useState(1)
    const [firstLoad, setFirstLoad] = useState(true)
    const [fileVideo, setFileVideo] = useState('')
    const [fileVideo2, setFileVideo2] = useState('')
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

            setFileVideo(getEpisode.data.episode.video)

            if (!getEpisode.data.episode.video) {
                if (getEpisode.data.episode.bvideo) setActiveServer(2)
            }

            if (getEpisode.data.episode.bvideo) {
                setFileVideo2(getEpisode.data.episode.bvideo)
            } else {
                setFileVideo2('')
                setActiveServer(1)
            }
            setData(getEpisode.data)
            addHistory(getEpisode.data.episode._id)

            var nextEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + 1}`)
            var prevEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + -1}`)

            if (getEpisode.data.film._id == '6338f164077ba66d3fcf96d3') {
                nextEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${parseFloat(getEpisode.data.episode.no) + 0.5}`)
                prevEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + -1}`)
            } else if (getEpisode.data.film._id == '6338f171077ba66d3fcf96d7') {
                nextEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${parseFloat(getEpisode.data.episode.no) + 0.5}`)
                prevEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${parseFloat(getEpisode.data.episode.no) - 0.5}`)
            } else {
                nextEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + 1}`)
                prevEpisode = await axios.get(`${apiUrl}/episode/cariNo/${getEpisode.data.film._id}/${getEpisode.data.episode.no + -1}`)
            }

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
        setFirstLoad(false)
        history('/watch/' + eid)
        setLoading(true)
    }

    const changeServer = async (server) => {
        setActiveServer(server)
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
                            <span
                                className='text-base lg:text-lg jost'
                            >
                                {data.film.title.substring(0, 40)} - <span className='text-primary'>
                                    Episode {
                                        nextEpisode.doubleEps ? data.episode.no + " & " + parseInt(data.episode.no + 1) : data.episode.no
                                    }
                                </span>
                            </span>
                        </h1>
                        <div className='text-sm text-semibold text-gray-300'>
                            *Gunakan server 2 jika server 1 tidak dapat diputar.
                        </div>
                        <div className="flex gap-2 mb-2">
                            <button className={`button-disable ${activeServer == 1 ? 'border-b' : 'border-b-0'} border-primary`} onClick={() => changeServer(1)}>
                                Server 1
                            </button>
                            {fileVideo2 ? (

                                <button className={`button-disable ${activeServer == 2 ? 'border-b' : 'border-b-0'} border-primary`} onClick={() => changeServer(2)}>
                                    Server 2
                                </button>
                            ) : ''}
                        </div>
                        <div className='flex justify-center'>
                            {activeServer == 1 ? (
                                <VideoJS videoSource={fileVideo} />
                            ) : activeServer == 2 ? (
                                <BVideo videoSource={fileVideo2} />
                            ) : 'Not Found'}
                        </div>
                        <div className='flex justify-between mt-4 text-xs lg:text-base mb-2 jost'>
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
                        className="mt-14 lg:mt-8 flex w-full lg:w-1/3 flex-col space-y-3 jost"
                    >
                        <h1 className='text-lg lg:text-xl font-bold text-primary cursor-pointer' onClick={() => history('/detail-anime/' + data.film._id)}>{data.film.title}</h1>
                        <div className='flex flex-row space-x-6 cursor-pointer' onClick={() => history('/detail-anime/' + data.film._id)}>
                            <div className='relative w-[500px] lg:w-[700px]'>
                                <div className='w-full h-[40px] absolute top-[-1px] bg-merges-top'></div>
                                <div className='w-full h-[40px] absolute bottom-[-1px] bg-merges-bottom'></div>
                                <div className='h-full w-[20px] absolute right-[-1px] bg-merges-right'></div>
                                <div className='h-full w-[20px] absolute left-[-1px] bg-merges-left'></div>
                                <img className='w-32 lg:w-44 h-32 lg:h-44' src={data.film.poster} alt="Cover" />
                            </div>
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