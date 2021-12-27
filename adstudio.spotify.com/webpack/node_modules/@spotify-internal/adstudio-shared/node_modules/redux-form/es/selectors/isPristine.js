var createIsPristine = function createIsPristine(_ref) {
  var deepEqual = _ref.deepEqual,
      empty = _ref.empty,
      getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      var formState = nonNullGetFormState(state);
      var initial = getIn(formState, form + '.initial') || empty;
      var values = getIn(formState, form + '.values') || initial;
      return deepEqual(initial, values);
    };
  };
};

export default createIsPristine;