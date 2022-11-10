import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

function TambahEps() {
    const video = useRef()
    const date = useRef()
    const no = useRef()
    const id = useRef()
    const [number, setNumber] = useState(0)
    const apiUrl = useSelector(state => state.api.apiUrl)

    useEffect(() => {
        video.current.focus()
    }, [])


    const tambah = event => {
        event.preventDefault();
        var data = {}
        if (no.current.value == '') {
            data = {
                video: video.current.value,
                date: date.current.value
            }
        } else {
            data = {
                video: video.current.value,
                no: no.current.value,
                date: date.current.value
            }
        }
        axios.post(apiUrl + '/episode/' + id.current.value, data).then(() => {
            setNumber(number + 1)
            video.current.value = ''
            video.current.focus()
        })
    }

    const cariFilm = () => {
        axios.get(apiUrl + '/films/' + id.current.value).then(res => {
            if (res.data.episodes[0]) {
                setNumber(res.data.episodes[0].no + 1)
            } else {
                setNumber(1)
            }
        })
    }

    return (
        <form onSubmit={tambah}>
            <div className='w-full h-screen flex items-center justify-center flex-col gap-2 px-20'>
                <input onChange={() => cariFilm()} className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={id} type="text" placeholder='ID Anime' />
                <input className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={video} type="text" placeholder='Link Video' />
                <input value={number} onChange={(e) => setNumber(e.target.value)} className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={no} type="number" placeholder='Nomor' />
                <input className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={date} type="text" placeholder='Date' />
                <button type='submit' className='button w-[400px]'>Kirim</button>
            </div>
        </form>
    )
}

export default TambahEps