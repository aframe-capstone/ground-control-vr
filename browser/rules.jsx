import React from 'react'
import {Button, Icon, Row, Col, NavItem, Navbar} from 'react-materialize'

export default function Rules(props) {
  return (
    <div className='instructions'>
      <div className='widget'>
        <div className="instructions-header">Instructions</div>
        <div className='instructions-paragraph'>
          <div s={12} l={12} m={12}>
            <div className="card-panel pink lighten-5 center-align">
              <span className="black-text">1. Each Galactic Hyperion XL5 spacecraft is outfitted with <strong>3 control panels</strong>, each with <strong>2 modules</strong> consisting of <strong>3 widgets</strong> and a <strong>submit button.</strong>
                <br></br>
              <span>See reference below examples of the different widgets</span>
            </span>
            </div>
          </div>

          <div s={12} l={12} m={12}>
            <div className="card-panel pink lighten-5 center-align">
              <span className="black-text">2. Each widget will either be a <strong>toggle switch</strong>, a <strong>knob</strong>, a <strong>button</strong>, or a <strong>slider</strong> </span>
            </div>
          </div>

          <div s={12} l={12} m={12}>
            <div className="card-panel pink lighten-5 center-align">
              <span className="black-text">3. Depending on what <strong>panel</strong> you are on (1, 2, 3) you will need to address several modules, and manipulate the widgets of the modules in a precise order
              </span>
            </div>
          </div>
          <div s={12} l={12} m={12}>
            <div className="card-panel pink lighten-5 center-align">
              <span className="black-text">4. When you have entered the correct inputs,<strong> hit the submit button at the far right of the panel</strong> to clear that panel. You should see an indicator appear above the panel and the lights should stay the same.
              </span>
            </div>
          </div>
          <div s={12} l={12} m={12}>
            <div className="card-panel pink lighten-5 center-align">
              <span className="black-text">5. If you submit the wrong inputs, the ALARM SYSTEM will activate. The alarm lights will go from <strong>white</strong> to <strong>orange</strong> to <strong id='RED'>RED</strong>. You have 3 strikes to get the configuration right across all panels before hurtling to your doom. </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
