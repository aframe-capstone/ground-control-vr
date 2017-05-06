import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import 'aframe-ui-widgets'

var score = 0;
var strikes = 0;
var numCorrect = 0;
const penalties = ['lights out', 'alarm/red light', 'faster to sun', 'static/contact lost']
const buttonColors = ['red', 'blue', 'green']


function randomRules(length, funct) {
        return Array.apply(null, Array(length)).map(function() {
            return funct
        });
}

//Math.floor(Math.random() * 6) + 1
//items[Math.floor(Math.random()*items.length)];

function generateButtonRule(){
  const randomColor = buttonColors[Math.floor(Math.random()*buttonColors.length)]
  const times = Math.floor(Math.random() * 5) + 1
  const panelNumber = Math.floor(Math.random()*3) +1

  return `Press the ${randomColor} button ${times} times on panel number ${panelNumber}`
}

// function buttonEventListener(){
//   if (buttonId ===blue && pressed) score++
//   else{
// stikes++
// p
//   }
// }




function generateSliderRule(){

}


function generateKnobRule(){

}

function generateToggleSwitchRule(){

}
