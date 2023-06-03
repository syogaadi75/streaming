import React from 'react'

function BVideo({ videoSource }) {
    return (
        <>
            <iframe className='w-[500px] lg:w-[620px] h-[180px] lg:h-[350px]' title="animey" id="mediaplayer" src={videoSource} allowFullScreen={true} frameBorder="0" marginWidth="0" marginHeight="0" scrolling="NO"></iframe>
        </>
    )
}

export default BVideo