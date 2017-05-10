import React from 'react'
import Clock from 'react-countdown-clock'
export default class Manual extends React.Component{
  constructor(props){
    super(props)
    this.state ={ stylePath: 'sciFi.css', tabSelected: 'tab1'}
  }

  selectTab(id){
    this.setState({tabSelected: id})
  }

  render(){
    return (
      <div>
        <link rel="stylesheet" type="text/css" href='sciFi.css' />

      <ul className="tabs-demo">
      <Clock color={'#00bebe'} seconds={180} size={100} id='clock'/>

  <div id= 'list-style'>
  <li onClick ={this.selectTab.bind(this, 'tab1')} className={this.state.tabSelected == 'tab1' ? 'selected' : null}>

    <input type="radio" classname="tab" id="tab1" checked />

    <label for="tab1">Rules</label>

    <div className="section"> <p>If you are reading this manual it means something has gone wrong with your ship.</p>
    <h1><a id="DONT_PANIC_10"></a><strong id='panic'>DON’T PANIC!</strong></h1>
    <p>Follow the instructions below carefully to resolve your problem with minimal casualties.</p>
    <h1><a id="Ship_Layout_14"></a>Ship Layout</h1>
    <ul>
    <li>Each Galactic Hyperion XL5 spacecraft is outfitted with <strong>3 control panels</strong>, each with <strong>2 modules</strong> consisting of <strong>3 widgets</strong> and a <strong>submit button</strong>.</li>
    <li>Each widget will either be a <strong>toggle switch</strong> or a <strong>button</strong>.</li>
    <li><em>Depending on what  <strong>phase</strong> you are experiencing (1, 2, 3) you will need to address several modules, and manipulate the widgets of the modules in a precise manner</em></li>
    <li>When you are certain that you have entered the correct inputs, <strong>hit the initializer button at the far right of the panel</strong> to clear that panel</li>
    <li>If you get the inputs wrong, the ALARM SYSTEM will activate, going from <strong>white</strong> to <strong>orange</strong> to <strong id='RED'>RED</strong>. You have 3 strikes to get the configuration right across all phases</li>
    </ul>
    <p>The instructions are organized  per phase, with two modules per phase that must be solved</p>
    <p><strong>Widgets are labeled from left to right</strong><br />
    Per module, each widget will have the following layout:</p>
    <pre><code className="language-sh"> Widget: (TYPE)(ORDER) : INSTRUCTIONS
    </code></pre>
    <li><p>Where TYPE is the kind of widget, ORDER is when in the sequence to use it, and INSTRUCTIONS is information on what to do with it.  </p></li>
    </div>


  </li>

  <li onClick ={this.selectTab.bind(this,'tab2')} className={this.state.tabSelected == 'tab2' ? 'selected' : null}>

    <input type="radio" name="tab" id="tab2" />

    <label for="tab2">Phase 1</label>

    <div className="section">
    <tr>
    <td>Nanomatronic Kilowasher</td>
    <td>Widget A: (SWITCH)(#1): turn up 1x; Widget B: (SWITCH)(#2): Set turn up 1x; Widget C: (SWITCH)(#3): turn up 1x</td>
    </tr>
    <br></br>

    <tr>
    <td>Gravitron Emitter</td>
    <td>Widget A: (BUTTON)(#4): press 1x ;  Widget B:(BUTTON)(#5): press 1x ; Widget C : (BUTTON)(#6): press 1x</td>
    </tr>
    </div>
  </li>

  <li onClick ={this.selectTab.bind(this,'tab3')} className={this.state.tabSelected == 'tab3' ? 'selected' : null}>

    <input type="radio" name="tab" id="tab3" />

    <label for="tab3">Phase 2</label>

    <div className="section">
    <tr>
    <td>Amp Scrambler</td>
    <td>Widget A: (SWITCH)(#1): turn up ;   Widget B: (BUTTON)(#3): press  75% ;Widget C: (SWITCH)(5): turn up</td>
    </tr>
    <br></br>
    <tr>
    <td>System Process Uploader</td>
    <td>Widget A: (BUTTON)(#6): press, then turn down to 0% Widget B:(SWITCH)(#4): turn up;  Widget C: (BUTTON)(#2): turn up 100%</td>
    </tr>
    </div>

  </li>

  <li onClick={this.selectTab.bind(this,'tab4')} className={this.state.tabSelected == 'tab4' ? 'selected' : null}>

    <input type="radio" name="tab" id="tab4" />

    <label for="tab4">Panel 3</label>

    <div className="section">
    <tr>
    <td>Circuit Current Computer</td>
    <td>Widget A:(BUTTON)(#6): press Widget B:(SWITCH)(#4): turn up Widget C: (BUTTON)(#2): press</td>
    </tr>
    <br></br>
    <tr>
    <td>Sensor Analyzer</td>
    <td>Widget A:(SWITCH)(#1): turn up ; Widget B (SWITCH)(#3): turn up ; Widget C: (BUTTON)(#5): press</td>
    </tr>
    </div>

  </li>
</div>

</ul>

</div>

    )
  }
}
