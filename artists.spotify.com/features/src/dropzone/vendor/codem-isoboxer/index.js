// ignore-string-externalization
/* eslint-disable */
/*! codem-isoboxer v0.3.7 https://github.com/madebyhiro/codem-isoboxer/blob/master/LICENSE.txt */
var ISOBoxer = {};

ISOBoxer.parseBuffer = function (arrayBuffer) {
  return new ISOFile(arrayBuffer).parse();
};

ISOBoxer.addBoxProcessor = function (type, parser) {
  if (typeof type !== 'string' || typeof parser !== 'function') {
    return;
  }
  ISOBox.prototype._boxProcessors[type] = parser;
};

ISOBoxer.Utils = {};
ISOBoxer.Utils.dataViewToString = function (dataView, encoding) {
  var impliedEncoding = encoding || 'utf-8';
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder(impliedEncoding).decode(dataView);
  }
  var a = [];
  var i = 0;

  if (impliedEncoding === 'utf-8') {
    /* The following algorithm is essentially a rewrite of the UTF8.decode at
    http://bannister.us/weblog/2007/simple-base64-encodedecode-javascript/
    */

    while (i < dataView.byteLength) {
      var c = dataView.getUint8(i++);
      if (c < 0x80) {
        // 1-byte character (7 bits)
      } else if (c < 0xe0) {
        // 2-byte character (11 bits)
        c = (c & 0x1f) << 6;
        c |= dataView.getUint8(i++) & 0x3f;
      } else if (c < 0xf0) {
        // 3-byte character (16 bits)
        c = (c & 0xf) << 12;
        c |= (dataView.getUint8(i++) & 0x3f) << 6;
        c |= dataView.getUint8(i++) & 0x3f;
      } else {
        // 4-byte character (21 bits)
        c = (c & 0x7) << 18;
        c |= (dataView.getUint8(i++) & 0x3f) << 12;
        c |= (dataView.getUint8(i++) & 0x3f) << 6;
        c |= dataView.getUint8(i++) & 0x3f;
      }
      a.push(String.fromCharCode(c));
    }
  } else {
    // Just map byte-by-byte (probably wrong)
    while (i < dataView.byteLength) {
      a.push(String.fromCharCode(dataView.getUint8(i++)));
    }
  }
  return a.join('');
};

export const parseBuffer = ISOBoxer.parseBuffer;
export const addBoxProcessor = ISOBoxer.addBoxProcessor;
export const Utils = ISOBoxer.Utils;

ISOBoxer.Cursor = function (initialOffset) {
  this.offset = typeof initialOffset == 'undefined' ? 0 : initialOffset;
};

var ISOFile = function (arrayBuffer) {
  this._cursor = new ISOBoxer.Cursor();
  this.boxes = [];
  if (arrayBuffer) {
    this._raw = new DataView(arrayBuffer);
  }
};

ISOFile.prototype.fetch = function (type) {
  var result = this.fetchAll(type, true);
  return result.length ? result[0] : null;
};

ISOFile.prototype.fetchAll = function (type, returnEarly) {
  var result = [];
  ISOFile._sweep.call(this, type, result, returnEarly);
  return result;
};

ISOFile.prototype.parse = function () {
  this._cursor.offset = 0;
  this.boxes = [];
  while (this._cursor.offset < this._raw.byteLength) {
    var box = ISOBox.parse(this);

    // Box could not be parsed
    if (typeof box.type === 'undefined') break;

    this.boxes.push(box);
  }
  return this;
};

ISOFile._sweep = function (type, result, returnEarly) {
  if (this.type && this.type == type) result.push(this);
  for (var box in this.boxes) {
    if (result.length && returnEarly) return;
    ISOFile._sweep.call(this.boxes[box], type, result, returnEarly);
  }
};

var ISOBox = function () {
  this._cursor = new ISOBoxer.Cursor();
};

ISOBox.parse = function (parent) {
  var newBox = new ISOBox();
  newBox._offset = parent._cursor.offset;
  newBox._root = parent._root ? parent._root : parent;
  newBox._raw = parent._raw;
  newBox._parent = parent;
  newBox._parseBox();
  parent._cursor.offset = newBox._raw.byteOffset + newBox._raw.byteLength;
  return newBox;
};

ISOBox.create = function (type) {
  var newBox = new ISOBox();
  newBox.type = type;
  newBox.boxes = [];
  return newBox;
};

ISOBox.prototype._boxContainers = [
  'dinf',
  'edts',
  'mdia',
  'meco',
  'mfra',
  'minf',
  'moof',
  'moov',
  'mvex',
  'stbl',
  'strk',
  'traf',
  'trak',
  'tref',
  'udta',
  'vttc',
  'sinf',
  'schi',
  'encv',
  'enca',
];

ISOBox.prototype._boxProcessors = {};

///////////////////////////////////////////////////////////////////////////////////////////////////
// Generic read/write functions

ISOBox.prototype._procField = function (name, type, size) {
  if (this._parsing) {
    this[name] = this._readField(type, size);
  }
};

ISOBox.prototype._procFieldArray = function (name, length, type, size) {
  var i;
  if (this._parsing) {
    this[name] = [];
    for (i = 0; i < length; i++) {
      this[name][i] = this._readField(type, size);
    }
  }
};

ISOBox.prototype._procFullBox = function () {
  this._procField('version', 'uint', 8);
  this._procField('flags', 'uint', 24);
};

ISOBox.prototype._procEntries = function (name, length, fn) {
  var i;
  if (this._parsing) {
    this[name] = [];
    for (i = 0; i < length; i++) {
      this[name].push({});
      fn.call(this, this[name][i]);
    }
  }
};

ISOBox.prototype._procSubEntries = function (entry, name, length, fn) {
  var i;
  if (this._parsing) {
    entry[name] = [];
    for (i = 0; i < length; i++) {
      entry[name].push({});
      fn.call(this, entry[name][i]);
    }
  }
};

ISOBox.prototype._procEntryField = function (entry, name, type, size) {
  if (this._parsing) {
    entry[name] = this._readField(type, size);
  }
};

ISOBox.prototype._procSubBoxes = function (name, length) {
  var i;
  if (this._parsing) {
    this[name] = [];
    for (i = 0; i < length; i++) {
      this[name].push(ISOBox.parse(this));
    }
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
// Read/parse functions

ISOBox.prototype._readField = function (type, size) {
  switch (type) {
    case 'uint':
      return this._readUint(size);
    case 'int':
      return this._readInt(size);
    case 'template':
      return this._readTemplate(size);
    case 'string':
      return size === -1
        ? this._readTerminatedString()
        : this._readString(size);
    case 'data':
      return this._readData(size);
    case 'utf8':
      return this._readUTF8String();
    default:
      return -1;
  }
};

ISOBox.prototype._readInt = function (size) {
  var result = null,
    offset = this._cursor.offset - this._raw.byteOffset;
  switch (size) {
    case 8:
      result = this._raw.getInt8(offset);
      break;
    case 16:
      result = this._raw.getInt16(offset);
      break;
    case 32:
      result = this._raw.getInt32(offset);
      break;
    case 64:
      // Warning: JavaScript cannot handle 64-bit integers natively.
      // This will give unexpected results for integers >= 2^53
      var s1 = this._raw.getInt32(offset);
      var s2 = this._raw.getInt32(offset + 4);
      result = s1 * Math.pow(2, 32) + s2;
      break;
  }
  this._cursor.offset += size >> 3;
  return result;
};

ISOBox.prototype._readUint = function (size) {
  var result = null,
    offset = this._cursor.offset - this._raw.byteOffset,
    s1,
    s2;
  switch (size) {
    case 8:
      result = this._raw.getUint8(offset);
      break;
    case 16:
      result = this._raw.getUint16(offset);
      break;
    case 24:
      s1 = this._raw.getUint16(offset);
      s2 = this._raw.getUint8(offset + 2);
      result = (s1 << 8) + s2;
      break;
    case 32:
      result = this._raw.getUint32(offset);
      break;
    case 64:
      // Warning: JavaScript cannot handle 64-bit integers natively.
      // This will give unexpected results for integers >= 2^53
      s1 = this._raw.getUint32(offset);
      s2 = this._raw.getUint32(offset + 4);
      result = s1 * Math.pow(2, 32) + s2;
      break;
  }
  this._cursor.offset += size >> 3;
  return result;
};

ISOBox.prototype._readString = function (length) {
  var str = '';
  for (var c = 0; c < length; c++) {
    var char = this._readUint(8);
    str += String.fromCharCode(char);
  }
  return str;
};

ISOBox.prototype._readTemplate = function (size) {
  var pre = this._readUint(size / 2);
  var post = this._readUint(size / 2);
  return pre + post / Math.pow(2, size / 2);
};

ISOBox.prototype._readTerminatedString = function () {
  var str = '';
  while (this._cursor.offset - this._offset < this._raw.byteLength) {
    var char = this._readUint(8);
    if (char === 0) break;
    str += String.fromCharCode(char);
  }
  return str;
};

ISOBox.prototype._readData = function (size) {
  var length =
    size > 0
      ? size
      : this._raw.byteLength - (this._cursor.offset - this._offset);
  if (length > 0) {
    var data = new Uint8Array(this._raw.buffer, this._cursor.offset, length);

    this._cursor.offset += length;
    return data;
  } else {
    return null;
  }
};

ISOBox.prototype._readUTF8String = function () {
  var length = this._raw.byteLength - (this._cursor.offset - this._offset);
  var data = null;
  if (length > 0) {
    data = new DataView(this._raw.buffer, this._cursor.offset, length);
    this._cursor.offset += length;
  }

  return data ? ISOBoxer.Utils.dataViewToString(data) : data;
};

ISOBox.prototype._parseBox = function () {
  this._parsing = true;
  this._cursor.offset = this._offset;

  // return immediately if there are not enough bytes to read the header
  if (this._offset + 8 > this._raw.buffer.byteLength) {
    this._root._incomplete = true;
    return;
  }

  this._procField('size', 'uint', 32);
  this._procField('type', 'string', 4);

  if (this.size === 1) {
    this._procField('largesize', 'uint', 64);
  }
  if (this.type === 'uuid') {
    this._procFieldArray('usertype', 16, 'uint', 8);
  }

  switch (this.size) {
    case 0:
      this._raw = new DataView(
        this._raw.buffer,
        this._offset,
        this._raw.byteLength - this._cursor.offset + 8,
      );
      break;
    case 1:
      if (this._offset + this.size > this._raw.buffer.byteLength) {
        this._incomplete = true;
        this._root._incomplete = true;
      } else {
        this._raw = new DataView(
          this._raw.buffer,
          this._offset,
          this.largesize,
        );
      }
      break;
    default:
      if (this._offset + this.size > this._raw.buffer.byteLength) {
        this._incomplete = true;
        this._root._incomplete = true;
      } else {
        this._raw = new DataView(this._raw.buffer, this._offset, this.size);
      }
  }

  // additional parsing
  if (!this._incomplete) {
    if (this._boxProcessors[this.type]) {
      this._boxProcessors[this.type].call(this);
    }
    if (this._boxContainers.indexOf(this.type) !== -1) {
      this._parseContainerBox();
    } else {
      // Unknown box => read and store box content
      this._data = this._readData();
    }
  }
};

ISOBox.prototype._parseFullBox = function () {
  this.version = this._readUint(8);
  this.flags = this._readUint(24);
};

ISOBox.prototype._parseContainerBox = function () {
  this.boxes = [];
  while (this._cursor.offset - this._raw.byteOffset < this._raw.byteLength) {
    this.boxes.push(ISOBox.parse(this));
  }
};

// ISO/IEC 14496-12:2012 - 8.3.2 Track Header Box
ISOBox.prototype._boxProcessors['tkhd'] = function () {
  this._procFullBox();
  this._procField('creation_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('modification_time', 'uint', this.version == 1 ? 64 : 32);
  this._procField('track_ID', 'uint', 32);
  this._procField('reserved1', 'uint', 32);
  this._procField('duration', 'uint', this.version == 1 ? 64 : 32);
  this._procFieldArray('reserved2', 2, 'uint', 32);
  this._procField('layer', 'uint', 16);
  this._procField('alternate_group', 'uint', 16);
  this._procField('volume', 'template', 16);
  this._procField('reserved3', 'uint', 16);
  this._procFieldArray('matrix', 9, 'template', 32);
  this._procField('width', 'template', 32);
  this._procField('height', 'template', 32);
};
