function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

//      
function moveFieldState(state, source, destKey, oldState) {
  if (oldState === void 0) {
    oldState = state;
  }

  delete state.fields[source.name];
  state.fields[destKey] = _extends({}, source, {
    name: destKey,
    // prevent functions from being overwritten
    // if the state.fields[destKey] does not exist, it will be created
    // when that field gets registered, with its own change/blur/focus callbacks
    change: oldState.fields[destKey] && oldState.fields[destKey].change,
    blur: oldState.fields[destKey] && oldState.fields[destKey].blur,
    focus: oldState.fields[destKey] && oldState.fields[destKey].focus,
    lastFieldState: undefined // clearing lastFieldState forces renotification

  });

  if (!state.fields[destKey].change) {
    delete state.fields[destKey].change;
  }

  if (!state.fields[destKey].blur) {
    delete state.fields[destKey].blur;
  }

  if (!state.fields[destKey].focus) {
    delete state.fields[destKey].focus;
  }
}

//      
// From MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
var escapeRegexTokens = function escapeRegexTokens(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}; // $& means the whole matched string

var insert = function insert(_ref, state, _ref2) {
  var name = _ref[0],
      index = _ref[1],
      value = _ref[2];
  var changeValue = _ref2.changeValue,
      resetFieldState = _ref2.resetFieldState;
  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    copy.splice(index, 0, value);
    return copy;
  });

  var backup = _extends({}, state.fields); // now we have increment any higher indexes


  var pattern = new RegExp("^" + escapeRegexTokens(name) + "\\[(\\d+)\\](.*)"); // we need to increment high indices first so
  // lower indices won't overlap

  Object.keys(state.fields).sort().reverse().forEach(function (key) {
    var tokens = pattern.exec(key);

    if (tokens) {
      var fieldIndex = Number(tokens[1]);

      if (fieldIndex >= index) {
        // inc index one higher
        var incrementedKey = name + "[" + (fieldIndex + 1) + "]" + tokens[2];
        moveFieldState(state, backup[key], incrementedKey);
      }
    }
  });
};

//      
var concat = function concat(_ref, state, _ref2) {
  var name = _ref[0],
      value = _ref[1];
  var changeValue = _ref2.changeValue;
  changeValue(state, name, function (array) {
    return array ? [].concat(array, value) : value;
  });
};

//      

function moveFields(name, matchPrefix, destIndex, state) {
  Object.keys(state.fields).forEach(function (key) {
    if (key.substring(0, matchPrefix.length) === matchPrefix) {
      var suffix = key.substring(matchPrefix.length);
      var destKey = name + "[" + destIndex + "]" + suffix;
      moveFieldState(state, state.fields[key], destKey);
    }
  });
}

//      
function restoreFunctions(state, backupState) {
  Object.keys(state.fields).forEach(function (key) {
    state.fields[key] = _extends({}, state.fields[key], {
      change: state.fields[key].change || backupState.fields[key] && backupState.fields[key].change,
      blur: state.fields[key].blur || backupState.fields[key] && backupState.fields[key].blur,
      focus: state.fields[key].focus || backupState.fields[key] && backupState.fields[key].focus
    });

    if (!state.fields[key].change) {
      delete state.fields[key].change;
    }

    if (!state.fields[key].blur) {
      delete state.fields[key].blur;
    }

    if (!state.fields[key].focus) {
      delete state.fields[key].focus;
    }
  });
}

var TMP = 'tmp';

var move = function move(_ref, state, _ref2) {
  var name = _ref[0],
      from = _ref[1],
      to = _ref[2];
  var changeValue = _ref2.changeValue;

  if (from === to) {
    return;
  }

  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    var value = copy[from];
    copy.splice(from, 1);
    copy.splice(to, 0, value);
    return copy;
  }); //make a copy of a state for further functions restore

  var backupState = _extends({}, state, {
    fields: _extends({}, state.fields) // move this row to tmp index

  });

  var fromPrefix = name + "[" + from + "]";
  moveFields(name, fromPrefix, TMP, state);

  if (from < to) {
    // moving to a higher index
    // decrement all indices between from and to
    for (var i = from + 1; i <= to; i++) {
      var innerFromPrefix = name + "[" + i + "]";
      moveFields(name, innerFromPrefix, "" + (i - 1), state);
    }
  } else {
    // moving to a lower index
    // increment all indices between to and from
    for (var _i = from - 1; _i >= to; _i--) {
      var _innerFromPrefix = name + "[" + _i + "]";

      moveFields(name, _innerFromPrefix, "" + (_i + 1), state);
    }
  } // move from tmp index to destination


  var tmpPrefix = name + "[" + TMP + "]";
  moveFields(name, tmpPrefix, to, state);
  restoreFunctions(state, backupState);
};

//      

var pop = function pop(_ref, state, _ref2) {
  var name = _ref[0];
  var changeValue = _ref2.changeValue;
  var result;
  var removedIndex;
  changeValue(state, name, function (array) {
    if (array) {
      if (!array.length) {
        return [];
      }

      removedIndex = array.length - 1;
      result = array[removedIndex];
      return array.slice(0, removedIndex);
    }
  }); // now we have to remove any subfields for our index,

  if (removedIndex !== undefined) {
    var pattern = new RegExp("^" + escapeRegexTokens(name) + "\\[" + removedIndex + "].*");
    Object.keys(state.fields).forEach(function (key) {
      if (pattern.test(key)) {
        delete state.fields[key];
      }
    });
  }

  return result;
};

//      
var push = function push(_ref, state, _ref2) {
  var name = _ref[0],
      value = _ref[1];
  var changeValue = _ref2.changeValue;
  changeValue(state, name, function (array) {
    return array ? [].concat(array, [value]) : [value];
  });
};

var remove = function remove(_ref, state, _ref2) {
  var name = _ref[0],
      index = _ref[1];
  var changeValue = _ref2.changeValue,
      renameField = _ref2.renameField;
  var returnValue;
  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    returnValue = copy[index];
    copy.splice(index, 1);
    return copy;
  }); // now we have to remove any subfields for our index,
  // and decrement all higher indexes.

  var pattern = new RegExp("^" + escapeRegexTokens(name) + "\\[(\\d+)\\](.*)");

  var backup = _extends({}, state, {
    fields: _extends({}, state.fields)
  });

  Object.keys(state.fields).forEach(function (key) {
    var tokens = pattern.exec(key);

    if (tokens) {
      var fieldIndex = Number(tokens[1]);

      if (fieldIndex === index) {
        // delete any subfields for this array item
        delete state.fields[key];
      } else if (fieldIndex > index) {
        // shift all higher ones down
        delete state.fields[key];
        var decrementedKey = name + "[" + (fieldIndex - 1) + "]" + tokens[2];

        if (backup.fields[decrementedKey]) {
          moveFieldState(state, backup.fields[key], decrementedKey, backup);
        } else {
          // take care of setting the correct change, blur, focus, validators on new field
          renameField(state, key, decrementedKey);
        }
      }
    }
  });
  return returnValue;
};

var countBelow = function countBelow(array, value) {
  return array.reduce(function (count, item) {
    return item < value ? count + 1 : count;
  }, 0);
};

var removeBatch = function removeBatch(_ref, state, _ref2) {
  var name = _ref[0],
      indexes = _ref[1];
  var changeValue = _ref2.changeValue;
  var sortedIndexes = [].concat(indexes);
  sortedIndexes.sort(); // remove duplicates

  for (var i = 0; i < sortedIndexes.length; i++) {
    if (i > 0 && sortedIndexes[i] === sortedIndexes[i - 1]) {
      sortedIndexes.splice(i--, 1);
    }
  }

  var returnValue = [];
  changeValue(state, name, function (array) {
    // use original order of indexes for return value
    returnValue = indexes.map(function (index) {
      return array && array[index];
    });

    if (!array || !sortedIndexes.length) {
      return array;
    }

    var copy = [].concat(array);
    var removed = [];
    sortedIndexes.forEach(function (index) {
      copy.splice(index - removed.length, 1);
      removed.push(array && array[index]);
    });
    return copy;
  }); // now we have to remove any subfields for our indexes,
  // and decrement all higher indexes.

  var pattern = new RegExp("^" + escapeRegexTokens(name) + "\\[(\\d+)\\](.*)");

  var newState = _extends({}, state, {
    fields: {}
  });

  Object.keys(state.fields).forEach(function (key) {
    var tokens = pattern.exec(key);

    if (tokens) {
      var fieldIndex = Number(tokens[1]);

      if (!~sortedIndexes.indexOf(fieldIndex)) {
        // not one of the removed indexes
        // shift all higher ones down
        var decrementedKey = name + "[" + (fieldIndex - countBelow(sortedIndexes, fieldIndex)) + "]" + tokens[2];
        moveFieldState(newState, state.fields[key], decrementedKey, state);
      }
    } else {
      newState.fields[key] = state.fields[key];
    }
  });
  state.fields = newState.fields;
  return returnValue;
};

//      

var shift = function shift(_ref, state, tools) {
  var name = _ref[0];
  return remove([name, 0], state, tools);
};

var TMP$1 = 'tmp';

var swap = function swap(_ref, state, _ref2) {
  var name = _ref[0],
      indexA = _ref[1],
      indexB = _ref[2];
  var changeValue = _ref2.changeValue;

  if (indexA === indexB) {
    return;
  }

  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    var a = copy[indexA];
    copy[indexA] = copy[indexB];
    copy[indexB] = a;
    return copy;
  }); //make a copy of a state for further functions restore

  var backupState = _extends({}, state, {
    fields: _extends({}, state.fields) // swap all field state that begin with "name[indexA]" with that under "name[indexB]"

  });

  var aPrefix = name + "[" + indexA + "]";
  var bPrefix = name + "[" + indexB + "]";
  var tmpPrefix = name + "[" + TMP$1 + "]";
  moveFields(name, aPrefix, TMP$1, state);
  moveFields(name, bPrefix, indexA, state);
  moveFields(name, tmpPrefix, indexB, state);
  restoreFunctions(state, backupState);
};

//      

var unshift = function unshift(_ref, state, tools) {
  var name = _ref[0],
      value = _ref[1];
  return insert([name, 0, value], state, tools);
};

//      
var update = function update(_ref, state, _ref2) {
  var name = _ref[0],
      index = _ref[1],
      value = _ref[2];
  var changeValue = _ref2.changeValue;
  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    copy.splice(index, 1, value);
    return copy;
  });
};

//      
var mutators = {
  insert: insert,
  concat: concat,
  move: move,
  pop: pop,
  push: push,
  remove: remove,
  removeBatch: removeBatch,
  shift: shift,
  swap: swap,
  unshift: unshift,
  update: update
};

export default mutators;
