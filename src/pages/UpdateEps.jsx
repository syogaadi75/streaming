import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

function UpdateEps() {
    const video = useRef()
    const no = useRef()
    const id = useRef()
    const date = useRef()
    const apiUrl = useSelector(state => state.api.apiUrl)

    useEffect(() => {
        id.current.focus()
    }, [])


    const update = event => {
        event.preventDefault();
        var data = {
            video: video.current.value,
            date: date.current.value
        }

        axios.put(apiUrl + '/episode/' + id.current.value, data).then(() => {
            id.current.value = ''
            video.current.value = ''
            id.current.focus()
        })
    }

    return (
        <form onSubmit={update}>
            <div className='w-full h-screen flex items-center justify-center flex-col gap-2 px-20'>
                <input className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={id} type="text" placeholder='ID Anime' />
                <input className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={video} type="text" placeholder='Link Video' />
                <input className='w-full p-3 bg-dark text-primary outline-none border border-primary' ref={date} type="text" placeholder='Date' />
                <button type='submit' className='button w-[400px]'>Kirim</button>
            </div>
        </form>
    )
}

export default UpdateEps