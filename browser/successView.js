import React from 'react'
import {connect} from 'react-redux'
//import explosion from '.././public/./assets/explodingShip'

const mapStatetoProps = (state) =>{
  return{
    phases: state.phases
  }
}

 function Success(props){

     return(
      props.phases===4 ?
      <div>
        Here would go a breakdown of all your stats and your performance metrics, e.g. your 'cooperativeness rating'
      </div>
     : null
    )
  }


const SuccessView = connect(mapStatetoProps)(Success)
export default SuccessView
