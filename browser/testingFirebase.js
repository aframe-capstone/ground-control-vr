import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-firebase-component'
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';


class testingFirebase extends React.Component {
	render() {
		return (
			<Scene >
				< Entity id="simpleBox" geometry="{{primitive: 'box', width: 1, height: 1, lenght: 1}}" 
				material="{{color: blue}}" />
				<Entity id="avatar" geometry="{{primitive: 'box', width: 1, height: 1, lenght: 1}}" material="{{color: red}}"  />
			</Scene>
		)
	}
}

export default testingFirebase;