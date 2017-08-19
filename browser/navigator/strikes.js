import React from 'react'
import {toneAnalyzer} from '../text-speech/text-speech';

//When there are 3 strikes, it triggers the toneAnalyzer after 5000ms
class StrikesWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.strikes > 2) {
      setTimeout(function() {
        toneAnalyzer()
      }, 5000)
    }
    return(
    <div>
      <div>Strikes</div>
      <div style={{display: 'flex'}} className='strikes'>
        <i style={{flex: 1, color: this.props.strikes < 1 ? 'white' : 'red'}} className="fa fa-times-circle-o strike1" aria-hidden="true"></i>
        <i style={{flex: 1, color: this.props.strikes < 2 ? 'white' : 'red'}} className="fa fa-times-circle-o strike1" aria-hidden="true"></i>
        <i style={{flex: 1, color: this.props.strikes < 3 ? 'white' : 'red'}} className="fa fa-times-circle-o strike1" aria-hidden="true"></i>
      </div>
    </div>
    )
  }
}

export default StrikesWidget
