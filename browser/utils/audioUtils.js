import toBuffer from 'typedarray-to-buffer'

const convertAudioToBinary = (event, fileReader) => {
  const audioData = event.data
  fileReader.readAsBinaryString(audioData)
}

const toArrayBuffer = (buf) => {
  var arrayBuff = new ArrayBuffer(buf.length)
  var view = new Uint8Array(arrayBuff)
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i]
  }
  return arrayBuff
}

const convertDataStreamToAudioArrayBuffer = (dataArr) => {
  return toArrayBuffer(toBuffer(dataArr))
}

export {convertDataStreamToAudioArrayBuffer, convertAudioToBinary}
