import { CheckIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadepisode, saveEpisodeId, sendIdEpisode } from '../../features/episodeSlice'

function CardAnimeList({ eid, coverImg, title, no, film }) {
    const history = useNavigate()
    const dispatch = useDispatch()

    const tonton = () => {
        // dispatch(saveEpisodeId(eid))
        history('/watch/' + eid)
    }

    return (
        <div onClick={() => tonton()} className='w-[150px] h-[220px] relative group cursor-pointer overflow-hidden rounded-lg'>
            <div className='absolute top-0 left-0 z-10  p-2 text-center card-hover-text'>
                <h4 className='font-semibold text-sm text-primary'>Eps {no}</h4>
            </div>
            {film.tamat && (
                <div className='absolute top-0 right-0 z-10  p-2 text-center card-hover-text'>
                    <h4 className='font-semibold text-sm text-green-500 flex gap-1'> <CheckIcon className='w-5' strokeWidth={3} /> <span>End</span></h4>
                </div>
            )}
            <div className='absolute bottom-0 left-0 z-10 w-full p-2 text-center card-hover-text'>
                <h4 className='font-semibold text-sm'>{title}</h4>
            </div>
            <img className='card-hover-img bg-cover w-[150px] h-[220px]' src={coverImg} alt="Cover Img" loading='lazy' />
        </div>
    )
}

export default CardAnimeList