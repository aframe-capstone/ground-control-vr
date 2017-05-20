import React from 'react'

const StrikesWidget = (props) => (
    <div>
    <div>Strikes</div>
    <div style={{display: 'flex'}} className='strikes'>
      <i style={{flex: 1, color: props.strikes < 1 ? 'white' : 'red'}} className="fa fa-times-circle-o strike1" aria-hidden="true"></i>
      <i style={{flex: 1, color: props.strikes < 2 ? 'white' : 'red'}} className="fa fa-times-circle-o strike1" aria-hidden="true"></i>
      <i style={{flex: 1, color: props.strikes < 3 ? 'white' : 'red'}} className="fa fa-times-circle-o strike1" aria-hidden="true"></i>
    </div>
    </div>
  )

export default StrikesWidget
