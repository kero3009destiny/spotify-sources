// ignore-string-externalization
var Key;

(function (Key) {
  Key[Key["downArrow"] = 40] = "downArrow";
  Key[Key["enter"] = 13] = "enter";
  Key[Key["escape"] = 27] = "escape";
  Key[Key["upArrow"] = 38] = "upArrow";
})(Key || (Key = {}));

export function keyboardNavigation(filterOptions, selectedDropdownIndex, setSelectedDropdownIndex, setShowDropdown, timeFilterCallback) {
  var value = filterOptions.map(function (option) {
    return option.value;
  })[selectedDropdownIndex];
  return function handleKeyDown(e) {
    switch (e.which) {
      case Key.upArrow:
        {
          if (selectedDropdownIndex !== 0) {
            setSelectedDropdownIndex(selectedDropdownIndex - 1);
          }

          break;
        }

      case Key.downArrow:
        {
          if (selectedDropdownIndex < filterOptions.length - 1) {
            setSelectedDropdownIndex(selectedDropdownIndex + 1);
          }

          break;
        }

      case Key.enter:
        {
          timeFilterCallback(value);
          setShowDropdown(false);
          break;
        }

      case Key.escape:
        {
          e.preventDefault();
          setShowDropdown(false);
          var element = document.getElementById('dropdown-toggle');
          element.focus();
          break;
        }

      default:
        {
          break;
        }
    }
  };
}