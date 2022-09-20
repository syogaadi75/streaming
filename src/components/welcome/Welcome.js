import React, { useRef, useState } from 'react'
import './Welcome.css'
import { Bars3Icon, MagnifyingGlassIcon, PlayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Welcome() {
    const history = useNavigate()
    const [dataPencarian, setDataPencarian] = useState([])
    const title = useRef()
    const hasil = useRef()

    const tonton = (eid) => {
        history('/detail-anime/' + eid)
    }

    const cari = () => {
        axios.get('https://yappstreamapi.herokuapp.com/films/search/' + title.current.value).then(res => {
            setDataPencarian(res.data)
            if (title.current.value) {
                hasil.current.classList.remove('hide')
                hasil.current.classList.add('hasil')
            } else {
                hasil.current.classList.remove('hasil')
                hasil.current.classList.add('hide')
            }
        })
    }

    return (
        <>
            <div className='flex justify-between items-center h-screen text-light overflow-hidden flex-col lg:flex-row'>
                <div className='relative'>
                    <div className='absolute left-20 -bottom-28 h-[200px] skew-x-[45deg] border-2 border-primary'></div>
                    <div className='absolute left-16 top-0 h-[800px] -skew-x-[45deg] border border-primary'></div>
                    <div className='px-8 p-6 relative bg-dark/70 z-10  pt-14 mt-20 lg:pt-0 lg:mt-16 lg:mx-14 backdrop-blur-sm rounded'>
                        <div className='mb-4'>Hai 👋, <span className='text-primary'>Selamat Datang</span></div>
                        <div className='text-3xl lg:text-4xl flex space-x-3 lg:space-x-6 mb-2'>
                            <h1 className='text-primary font-bold'>Yapp</h1>
                            <XMarkIcon className='w-8 lg:w-10' color='#facc15' />
                            <h1 className='font-bold'>Streaming</h1>
                        </div>
                        <div className='mb-8 text-xs lg:text-sm'>Tonton anime subtitle Indonesia secara gratis.</div>
                        <div className='text-gray-200 text-sm lg:text-base'>
                            <div className='mb-4 flex gap-4'>
                                <button className='button text-xs lg:text-base' onClick={() => history('/daftar-anime')}><Bars3Icon className='w-5' /> <span>Data Anime</span></button>
                                <button className='button-disable text-xs lg:text-base' onClick={() => history('/terakhir-ditonton')}><PlayIcon className='w-5' /> <span>Terakhir Ditonton</span></button>
                            </div>
                            <div className='flex flex-col relative'>
                                <input onKeyUp={() => cari()} ref={title} className='w-full p-3 outline-none bg-dark text-light border-2 border-primary rounded' type="text" placeholder='Cari Anime | Contoh: One Piece ' />
                                <div ref={hasil} className='flex flex-col max-h-[180px] gap-2 hide bg-dark w-full px-4 py-6 transition-all duration-300 ease-in-out overflow-y-auto shadow-2xl shadow-black/50 rounded scrollbar-hide'>
                                    <h1>Hasil Pencarian : </h1>

                                    {dataPencarian.length > 0 ? (
                                        dataPencarian.map(pencarian => (
                                            <button onClick={() => tonton(pencarian._id)} key={pencarian._id} className='button w-full font-semibold'>{pencarian.title}</button>
                                        ))
                                    ) : (<button className='button-disable w-full font-semibold'>Tidak ditemukan</button>)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='flex overflow-hidden'>
                    <div className='cover z-10 bg-cover-op bg-cover'></div>
                    <div className='cover z-10 bg-cover-spyfamily bg-cover'></div>
                    <div className='cover z-0 bg-cover-bcl bg-cover'></div>
                    <div className='cover z-10 bg-cover-yourname bg-cover'></div>
                    <div className='cover z-10 bg-cover-naruto bg-cover'></div>
                </div>
            </div>
        </>
    )
}

export default Welcome