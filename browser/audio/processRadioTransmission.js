import Tuna from 'tunajs'

// Transforms messaging audio in audio.js into a NASA-style radio transmission
const processRadioTransmission = (audioContext, audioSource) => {
  var tuna = new Tuna(audioContext)

  // Filters out high and low freqs
  var filter = new tuna.Filter({
    frequency: 440,
    Q: 80,
    gain: 0,
    filterType: 'bandpass',
    bypass: 0
  })

  // Distorts audio
  var overdrive = new tuna.Overdrive({
    outputGain: 0,
    drive: 1,
    curveAmount: 0.65,
    algorithmIndex: 2,
    bypass: 0
  })

  var gainNode = audioContext.createGain()
  gainNode.gain.value = 0.05 // CHANGE THIS TO MODULATE NAVIGATOR VOLUME

  // Chains WebAudio nodes together to return processed audio buffer
  filter.connect(overdrive)
  audioSource.connect(overdrive)
  overdrive.connect(gainNode)
  gainNode.connect(audioContext.destination)
}

export default processRadioTransmission
