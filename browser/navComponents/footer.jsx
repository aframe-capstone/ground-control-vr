import React from 'react'

const Footer =() =>{
  return(
    <div style={{display:'flex', width:'100%', height:'100%'}}>
      <div className='img-wrapper'>
        <img className='img-col' src="assets/shipPhotos/button.png">
        </img>
        <div className='img-text'>Button</div>

      </div>
      <div className='img-wrapper'>
        <img className='img-col' src="assets/shipPhotos/switch.png">
        </img>
        <div className='img-text'>Switch</div>

      </div>
      <div className='img-wrapper'>
        <img className='img-col' src="assets/shipPhotos/submitButton.png">
        </img>
        <div className='img-text'>Submit Button</div>
      </div>
      <div className='img-wrapper'>
        <img className='img-col' src="assets/shipPhotos/panel.png">
        </img>
        <div className='img-text'>Panel</div>
      </div>
    </div>
  )
}

export default Footer
