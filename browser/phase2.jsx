import React from 'react'
import {Button, Icon, Row, Col, NavItem, Navbar, Table} from 'react-materialize'

export default function Rules(props) {
  return (
    <div>
    <Col l={12}>Panel 2</Col>
    <br/>
    <div className="module">
      <Col l={12} className="moduleName">Module Name: Morty is Great</Col>
      <Table>
        <thead>
          <tr>
            <th data-field="id">Type of Widget</th>
            <th data-field="name">Instructions</th>
            <th data-field="price">Order</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Switch</td>
            <td>Toggle 1x</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Button</td>
            <td>Press 1x</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Switch</td>
            <td>Toggle 1x</td>
            <td>5</td>
          </tr>
        </tbody>
      </Table>
    </div>
    <div className="module">
       <Col l={12} className="moduleName">Module Name: Rick's Modules ... his genitals</Col>
        <Table>
          <thead>
            <tr>
              <th data-field="id">Type of Widget</th>
              <th data-field="name">Instructions</th>
              <th data-field="price">Order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Button</td>
              <td>Press 1x</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Switch</td>
              <td>Toggle 1x</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Button</td>
              <td>Press 1x</td>
              <td>2</td>
            </tr>
          </tbody>
        </Table>
    </div>
  </div>
  )
}
