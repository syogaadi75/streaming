import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

function TambahEps() {
    const video = useRef()
    const no = useRef()
    const id = useRef()
    const [number, setNumber] = useState(0)

    useEffect(() => {
        video.current.focus()
    }, [])


    const tambah = event => {
        event.preventDefault();
        var data = {}
        if (no.current.value == '') {
            data = {
                video: video.current.value
            }
        } else {
            data = {
                video: video.current.value,
                no: no.current.value
            }
        }
        axios.post('https://yappstreamapi.herokuapp.com/episode/' + id.current.value, data).then(() => {
            setNumber(number + 1)
            video.current.value = ''
            video.current.focus()
        })
    }

    const cariFilm = () => {
        axios.get('https://yappstreamapi.herokuapp.com/films/' + id.current.value).then(res => {
            setNumber(res.data.episodes[0].no + 1)
        })
    }

    return (
        <form onSubmit={tambah}>
            <div className='w-full h-screen flex items-center justify-center flex-col gap-2 px-20'>
                <input onChange={() => cariFilm()} className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={id} type="text" placeholder='ID Anime' />
                <input className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={video} type="text" placeholder='Link Video' />
                <input value={number} onChange={(e) => { }} className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={no} type="number" placeholder='Nomor' />
                <button type='submit' className='button w-[400px]'>Kirim</button>
            </div>
        </form>
    )
}

export default TambahEps