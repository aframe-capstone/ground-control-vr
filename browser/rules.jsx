import React from 'react'
import {Button, Icon, Row, Col, NavItem, Navbar} from 'react-materialize'

export default function Rules(props) {
  return (
  <div>
    <div className="section no-pad-bot pink lighten-5" id="index-banner">
      <div className="container">
        <br/>
        <h1 className="header center  pink-text text-darken-3">Welcome to the Future</h1>
        <div className="row center">
          <h5 className="header col s12 light">Your Ship is crashing into the Sun</h5>
        </div>
        <br/>
      </div>
    </div>
    <div>
      <h3 className="center">Instructions</h3>
      <Col l={12}>
        <div className="card-panel pink lighten-5 center-align">
          <span className="black-text">1. Each Galactic Hyperion XL5 spacecraft is outfitted with <strong>3 control panels</strong>, each with <strong>2 modules</strong> consisting of <strong>3 widgets</strong> and a <strong>submit button</strong> Each widget will either be a <strong>toggle switch</strong>, a <strong>knob</strong>, a <strong>button</strong>, or a <strong>slider</strong>
          </span>
        </div>
      </Col>
      <Col l={12}>
        <div className="card-panel pink lighten-5 center-align">
          <span className="black-text">2. Depending on what <strong>panel</strong> you are on (1, 2, 3) you will need to address several modules, and manipulate the widgets of the modules in a precise manner
          </span>
        </div>
      </Col>
      <Col l={12}>
        <div className="card-panel pink lighten-5 center-align">
          <span className="black-text">3. When you are certain that you have entered the correct inputs,<strong> hit the submit button at the far right of the panel</strong> to clear that panel
          </span>
        </div>
      </Col>
      <Col l={12}>
        <div className="card-panel pink lighten-5 center-align">
          <span className="black-text">4. If you get the inputs wrong, the ALARM SYSTEM will activate, going from <strong>white</strong> to <strong>orange</strong> to <strong id='RED'>RED</strong>. You have 3 strikes to get the configuration right across all panels
          </span>
        </div>
      </Col>
  </div>
  <div>
    <h3 className="center">Example of Widgets</h3>
    <Col className="center" l={2}>
      <div>Button</div>
      <img src="assets/widgets/button.jpg" />
    </Col>
    <Col className="center" l={2}>
      <div>Knob</div>
      <img src="assets/widgets/knob.jpg" />
    </Col>
    <Col className="center" l={2}>
      <div>Slider</div>
      <img src="assets/widgets/slider.jpg" />
    </Col>
    <Col className="center" l={2}>
      <div>Switch</div>
      <img src="assets/widgets/switch.jpg" />
    </Col>
  </div>
</div>

  )
}
