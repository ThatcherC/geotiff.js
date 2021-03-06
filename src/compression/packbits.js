import AbstractDecoder from "../abstractdecoder.js"


export default class PackbitsDecoder extends AbstractDecoder {
  decodeBlock(buffer) {
    var dataView = new DataView(buffer);
    var out = [];

    for (var i=0; i < buffer.byteLength; ++i) {
      var header = dataView.getInt8(i);
      if (header < 0) {
        var next = dataView.getUint8(i+1);
        header = -header;
        for (var j=0; j<=header; ++j) {
          out.push(next);
        }
        i += 1;
      }
      else {
        for (var j=0; j<=header; ++j) {
          out.push(dataView.getUint8(i+j+1));
        }
        i += header + 1;
      }
    }
    return new Uint8Array(out).buffer;
  }
}