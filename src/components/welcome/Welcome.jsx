import React, { useEffect, useRef, useState } from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import './Welcome.css'
import { Bars3Icon, MagnifyingGlassIcon, PlayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Welcome() {
    const history = useNavigate()
    const [dataPencarian, setDataPencarian] = useState([])
    const hasil = useRef()
    const [title, setTitle] = useState('')
    const apiUrl = useSelector(state => state.api.apiUrl)

    const tonton = (eid) => {
        history('/detail-anime/' + eid)
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (title != '') {
                const searchResult = await axios.get(apiUrl + '/films/search/' + title)
                setDataPencarian(searchResult.data)
                hasil.current.classList.remove('hide')
                hasil.current.classList.add('hasil')
            } else {
                setDataPencarian([])
                hasil.current.classList.remove('hasil')
                hasil.current.classList.add('hide')
            }
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [title])

    return (
        <>
            <div className='flex justify-between items-center h-screen text-light overflow-hidden flex-col lg:flex-row'>
                <div className='relative'>
                    <div className='absolute left-20 -bottom-28 h-[200px] skew-x-[45deg] border-2 border-primary'></div>
                    <div className='absolute left-16 top-0 h-[800px] -skew-x-[45deg] border border-primary'></div>
                    <div className='px-8 p-6 relative bg-dark/70 z-10  pt-14 mt-20 lg:pt-0 lg:mt-16 lg:mx-14 backdrop-blur-sm rounded'>
                        <div
                            data-aos-once="false"
                            data-aos="fade-right"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            className='mb-4'
                        >
                            Hai 👋,
                            <span className='text-primary'>Selamat Datang</span>
                        </div>
                        <div className='text-3xl lg:text-4xl flex space-x-3 lg:space-x-6 mb-2'>
                            <h1
                                data-aos-once="false"
                                data-aos="fade-right"
                                data-aos-offset="200"
                                data-aos-delay="50"
                                data-aos-duration="800"
                                data-aos-easing="ease-in-out"
                                className='text-primary font-bold'
                            >
                                Yapp
                            </h1>
                            <XMarkIcon
                                data-aos-once="false"
                                data-aos="flip-right"
                                data-aos-offset="200"
                                data-aos-delay="500"
                                data-aos-duration="800"
                                data-aos-easing="ease-in-out"
                                className='w-8 lg:w-10'
                                color='#facc15' />
                            <h1
                                data-aos-once="false"
                                data-aos="fade-right"
                                data-aos-offset="200"
                                data-aos-delay="1000"
                                data-aos-duration="800"
                                data-aos-easing="ease-in-out"
                                className='font-bold'
                            >
                                Streaming
                            </h1>
                        </div>
                        <div
                            data-aos-once="false"
                            data-aos="fade-down"
                            data-aos-offset="200"
                            data-aos-delay="1000"
                            data-aos-duration="800"
                            data-aos-easing="ease-in-out"
                            className='mb-8 text-xs lg:text-sm'
                        >
                            Nonton anime subtitle Indonesia secara mudah & gratis.
                        </div>
                        <div className='text-gray-200 text-sm lg:text-base'>
                            <div
                                className='mb-4 flex gap-4'
                            >
                                <button className='button text-xs lg:text-base' onClick={() => history('/daftar-anime')}><Bars3Icon className='w-5' /> <span>Data Anime</span></button>
                                <button className='button-disable text-xs lg:text-base' onClick={() => history('/terakhir-ditonton')}><PlayIcon className='w-5' /> <span>Terakhir Ditonton</span></button>
                            </div>
                            <div
                                className='flex flex-col relative'
                            >
                                <input onChange={(e) => setTitle(e.target.value)} className='w-full p-3 outline-none bg-dark text-light border-2 border-primary rounded' type="text" placeholder='Cari Anime | Contoh: One Piece ' />
                                <div ref={hasil} className='flex flex-col max-h-[180px] gap-2 hide bg-dark w-full px-4 py-6 transition-all duration-300 ease-in-out overflow-y-auto shadow-2xl shadow-black/50 rounded scrollbar-hide'>
                                    {dataPencarian.length > 0 ? (
                                        dataPencarian.map(pencarian => (
                                            <button onClick={() => tonton(pencarian._id)} key={pencarian._id} className='button w-full font-semibold text-xs lg:text-base'>{pencarian.title.substring(0, 35)}</button>
                                        ))
                                    ) : (<button className='button-disable w-full font-semibold'>Tidak ditemukan</button>)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div
                    className='flex overflow-hidden' data-aos-once="false"
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="500"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                >
                    <div className='cover order-2 lg:order-1 z-10 bg-cover-op bg-cover'></div>
                    <div className='cover order-1 lg:order-2 z-10 bg-cover-spyfamily bg-cover'></div>
                    <div className='cover order-3 lg:order-3 z-0 bg-cover-bcl bg-cover'></div>
                    <div className='cover order-5 lg:order-4 z-10 bg-cover-yourname bg-cover'></div>
                    <div className='cover order-4 lg:order-5 z-10 bg-cover-naruto bg-cover'></div>
                </div>
            </div>
        </>
    )
}

export default Welcome