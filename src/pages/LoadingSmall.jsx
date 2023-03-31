import React from 'react'

function LoadingSmall() {
    return (
        <div className='flex gap-2 items-center'>
            <div className='y-loader-small'></div>
            <div className='text-primary text-sm font-semibold'>Loading</div>
        </div>
    )
}

export default LoadingSmall