import React from 'react'
import { useNavigate } from 'react-router-dom'

function CardDaftarAnime({ eid, coverImg, title, no, film }) {
    const history = useNavigate()

    const tonton = () => {
        history('/detail-anime/' + eid)
    }

    return (
        <div onClick={() => tonton()} className='w-[150px] h-[220px] relative group cursor-pointer overflow-hidden rounded-lg'>
            {no && (
                <div className='absolute top-0 left-0 z-10  p-2 text-center card-hover-text'>
                    <h4 className='font-semibold text-sm text-primary'>{no} Eps</h4>
                </div>
            )}
            <div className='absolute bottom-0 left-0 z-10 w-full p-2 text-center card-hover-text'>
                <h4 className='font-semibold text-sm'>{title}</h4>
            </div>
            <img className='card-hover-img bg-cover w-[150px] h-[220px]' src={coverImg} alt="Cover Img" />
        </div>
    )
}

export default CardDaftarAnime