import { HomeIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function NotFound() {
    const history = useNavigate();

    return (
        <div className='flex w-full h-screen justify-center items-center flex-col'>
            <h1 className='text-4xl lg:text-6xl font-bold text-primary'>404, ERROR PAGE</h1>
            <img className='w-80' src="https://firebasestorage.googleapis.com/v0/b/y-stream-a09e6.appspot.com/o/error.png?alt=media&token=772e13d9-97e5-44db-a675-8b4323cef6eb" alt="Not Found" />
            <div className='flex flex-col'>
                <div className='mb-4'>
                    <span className='font-bold'>Oops!</span>, Halaman ini tidak tersedia
                </div>
                <button className='button' onClick={() => history('/')}> <HomeIcon className='w-6' /> <span>Kembali ke Home</span></button>
            </div>
        </div>
    )
}

export default NotFound