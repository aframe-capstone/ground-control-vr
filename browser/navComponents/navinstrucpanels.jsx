import React from 'react'

export default function Panels(props) {
  console.log('this is your props', props)
  return (
    <div style={{display:'flex', paddingTop:'20px'}}>
    {
    props.panel.module.map((element) => (

      <div key={element.name} className="widget table" style={{flex:1}}>
        <div s={12} l={12} className="moduleName">{element.name}</div>
          <div style={{display:'flex'}} className='header-container'>
            <div style={{flex:1}} data-field="id">Type of Widget</div>
              <div style={{flex:1}} data-field="name">Instructions</div>
              <div style={{flex:1}} data-field="price">Solution Order</div>
              <div style={{flex:1}}>Position</div>
          </div>
            {
              element.subset.map((sub) =>
              (
                  <div style={{display:'flex'}} className='row-container'>
                    <div className='fields' style={{flex:1}}>{sub.widget}</div>
                    <div className='fields' style={{flex:1}}>{sub.action}</div>
                    <div className='fields' style={{flex:1}}>{sub.order}</div>
                    <div className='fields' style={{flex:1}}>{sub.position}</div>
                  </div>
                )
              )
            }

      </div>
      ))
    }
  </div>
  )
}
