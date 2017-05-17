import toBuffer from 'typedarray-to-buffer'

const toArrayBuffer = (buf) => {
  var arrayBuff = new ArrayBuffer(buf.length)
  var view = new Uint8Array(arrayBuff)
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i]
  }
  return arrayBuff
}

const convertBinaryToTypedArray = (binaryMessage) => {
  const typedArray = new Uint8Array(binaryMessage.length)
  for (let i = 0; i < binaryMessage.length; i++) {
    typedArray[i] = binaryMessage.charCodeAt(i)
  }
  return typedArray
}

const convertDataStreamToAudioArrayBuffer = (dataArr) => toArrayBuffer(toBuffer(dataArr))

export {convertDataStreamToAudioArrayBuffer, convertBinaryToTypedArray}
