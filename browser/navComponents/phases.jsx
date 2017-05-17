import React from 'react'

const PhasesWidget = (props) =>{

  return (
    <div>
      <div>Panels Solved</div>
      <div style={{display:'flex'}} className='phases'>
        <i className="fa fa-dot-circle-o phase1" style={{ flex:1,color:props.phase >=2 ? 'white' : 'green'}} aria-hidden="true"></i>
        <i className="fa fa-dot-circle-o phase1" style={{ flex:1,color:props.phase >=3 ? 'white' : 'green'}} aria-hidden="true"></i>
        <i className="fa fa-dot-circle-o phase1" style={{ flex:1,color:props.phase >=4 ? 'white' : 'green'}} aria-hidden="true"></i>
      </div>
    </div>

  )
}

export default PhasesWidget
