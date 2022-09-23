import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

function UpdateEps() {
    const video = useRef()
    const no = useRef()
    const id = useRef()

    useEffect(() => {
        id.current.focus()
    }, [])


    const update = event => {
        event.preventDefault();
        var data = {
            video: video.current.value
        }

        axios.put('https://yappstreamapi.herokuapp.com/episode/' + id.current.value, data).then(() => {
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
                <button type='submit' className='button w-[400px]'>Kirim</button>
            </div>
        </form>
    )
}

export default UpdateEps