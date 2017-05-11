import React from 'react'
import {Button, Icon, Row, Col, NavItem, Navbar, Table} from 'react-materialize'

export default function Panels(props) {
  console.log('this is your props', props)
  return (
    <div>
    <Col l={12}>Panel {props.panel.number}</Col>
    <br/>
    {
      props.panel.module.map((element) => (

      <div key={element.name} className="module">
        <Col l={12} className="moduleName">Module Name: {element.name}</Col>
        <Table>
          <thead>
            <tr>
              <th data-field="id">Type of Widget</th>
              <th data-field="name">Instructions</th>
              <th data-field="price">Order</th>
            </tr>
          </thead>
          <tbody>
            {
              element.subset.map((sub) =>
              (
                  <tr key={sub.order}>
                    <td>{sub.widget}</td>
                    <td>{sub.action}</td>
                    <td>{sub.order}</td>
                  </tr>
                )
              )
            }
          </tbody>
        </Table>
      </div>
      ))
    }
  </div>
  )
}
