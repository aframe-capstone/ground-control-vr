import 'firebase';
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
// TODO FIX
import 'aframe-firebase-component'
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class TestingFirebase extends React.Component {
	render() {
		return (
			<Scene firebase={{apiKey: 'AIzaSyAoEAecAsSgktGQmv2dHhinVRrMhoUYiYg',
			authDomain: 'test-61ce3.firebaseapp.com',
			databaseURL: 'https://test-61ce3.firebaseio.com',
			projectId: 'test-61ce3',
			storageBucket: 'test-61ce3.appspot.com',
			messagingSenderId: '555633723470'}}>
				<a-assets>
					<a-mixin id="avatar-head"
							geometry="primitive: box; depth: 0.3; height: 0.3; width: 0.3"
							material="color: #222"></a-mixin>
				</a-assets>

				<Entity 
					id="avatar" 
					mixin="avatar-head" 
					camera 
					look-controls 
					wasd-controls
					position={{x: 0, y: 1.8, z: 5}}
					firebase-broadcast={{components: ['position']}}
			  	/>
			</Scene>
		)
	}
}

export default TestingFirebase;