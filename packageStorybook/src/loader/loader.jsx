import React from 'react'
import { CircularProgress } from '@mui/material'
import './loader.scss'

export default function Loader({className="primary"}) {
  return (
    <div className='wrapDiv'>
        <CircularProgress className={className}/>
    </div>
  )
}
