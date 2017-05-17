import React from 'react'
import Clock from 'react-countdown-clock'


const CountDown = (props) =>{

  return (
    <div className='clock'>
       <Clock color='white'  size={118} seconds={300} />
    </div>
  )
}

export default CountDown
