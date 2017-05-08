import React from 'react'

export default class Manual extends React.Component{
  constructor(props){
    super(props)
    this.state ={ stylePath: 'spaceship.css'}
  }

  render(){
    return (
      <body id="preview">
      <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
      <h1><a id="Galactic_Hyperion_XL5_Emergency_Operators_Manual__v_231_0"></a>Galactic Hyperion XL5 Emergency Operator’s Manual  v 2.31</h1>
      <p><img id='front-image' src="https://free.clipartof.com/35-Free-Retro-Clipart-Of-Spaceship-Launching-Into-Space.jpg" alt="N|"/></p>
      <hr/>
      <p>If you are reading this manual it means something has gone wrong with your ship.</p>
      <h1><a id="DONT_PANIC_10"></a><strong id='panic'>DON’T PANIC!</strong></h1>
      <p>Follow the instructions below carefully to resolve your problem with minimal casualties.</p>
      <h1><a id="Ship_Layout_14"></a>Ship Layout</h1>
      <ul>
      <li>Each Galactic Hyperion XL5 spacecraft is outfitted with <strong>3 control panels</strong>, each with <strong>2 modules</strong> consisting of <strong>3 widgets</strong> and a <strong>submit button</strong>.</li>
      <li>Each widget will either be a <strong>toggle switch</strong>, a <strong>knob</strong>, a <strong>button</strong>, or a <strong>slider</strong></li>
      <li><em>Depending on what  <strong>phase</strong> you are experiencing (1, 2, 3) you will need to address several modules, and manipulate the widgets of the modules in a precise manner</em></li>
      <li>When you are certain that you have entered the correct inputs, <strong>hit the initializer button at the far right of the panel</strong> to clear that panel</li>
      <li>If you get the inputs wrong, the ALARM SYSTEM will activate, going from <strong>white</strong> to <strong>orange</strong> to <strong id='RED'>RED</strong>. You have 3 strikes to get the configuration right across all phases</li>
      </ul>
      <p>The instructions below are organized  per phase, with two modules per phase that must be solved</p>
      <p><strong>Widgets are labeled from left to right</strong><br />
      Per module, each widget will have the following layout:</p>
    <pre><code className="language-sh"> Widget: (TYPE) : INSTRUCTIONS
      </code></pre>
      <hr/>
      <table className="table table-striped table-bordered">
      <thead>
      <tr>
      <th>Modules</th>
      <th>Phase 1</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>Scanner Unit System</td>
      <td>Widget A: (BUTTON): press 3X ; Widget B: (SWITCH): Set position up ; Widget C: (SLIDER): Turn to 100%</td>
      </tr>
      <br></br>
      <tr>
      <td>Gravitron Emitter</td>
      <td>Widget A: (KNOB): rotate 50% ;  Widget B:(BUTTON): press 2x ; Widget C : (BUTTON): press 5X</td>
      </tr>
      <hr/>
      <br></br>
      </tbody>
      </table>
      <table className="table table-striped table-bordered">
      <thead>
      <tr>
      <th>Modules</th>
      <th>Phase 2</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>Amp Scrambler</td>
      <td>Widget A: (KNOB): rotate 25%;   Widget B: (SLIDER): turn up 75% ;Widget C: (SWITCH): Set position up, set position down</td>
      </tr>
      <br></br>
      <tr>
      <td>System Process Uploader</td>
      <td>Widget A: (SLIDER): turn up 90%, then turn down to 0% Widget B:(BUTTON): press 3X;  Widget C: (SLIDER): turn up 100%</td>
      </tr>
      <hr/>
      <br></br>
      </tbody>
      </table>
      <table className="table table-striped table-bordered">
      <thead>
      <tr>
      <th>Modules</th>
      <th>Phase 3</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>Circuit Current Computer</td>
      <td>Widget A:(KNOB): turn 100% Widget B:(KNOB): turn 0% Widget C: (KNOB): turn 100%</td>
      </tr>
      <br></br>
      <tr>
      <td>Sensor Analyzer</td>
      <td>Widget A:(SLIDER): turn up 25% ; Widget B (SLIDER): turn up 75% ; Widget C: (KNOB): turn up 25%</td>
      </tr>
      <br></br>
      </tbody>
      </table>

      <p>WARNING</p>
      <pre><code className="language-sh">NEVER PRESS THE INITIALIZE BUTTON BEFORE YOU ARE FINISHED
      </code></pre>

      </body>
    )
  }
}
