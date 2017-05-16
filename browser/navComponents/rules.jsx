import React from 'react'
import {Button, Icon, Row, Col, NavItem, Navbar} from 'react-materialize'


export default function Rules(props) {
  return (
    <div className='instructions' >

      <div className='widget'>
        <div className="instructions-header">How to Use</div>
        <div className='instructions-paragraph'>
          <ol>
            <li>There are three panels on board the ship</li>
            <li>Solve each panel in the order of panel 1 to panel 3</li>
            <li>Each panel has two named modules, with three widgets (buttons or switches)</li>
            <li>Instruct the pilot on what to do for each panel by reading the docs for that panel</li>
            <li>Tell the pilot to press buttons and flip switches in the right order</li>
            <li> When the right order has been entered for that panel, hit the green submit button at the front of the ship!</li>
            <li>Solve all 3 panels before the timer runs out!</li>
          </ol>

        </div>
        </div>
    </div>

  )
}
