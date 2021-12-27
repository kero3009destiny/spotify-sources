export const formatCheckboxResults = (KEY_MAP, checkboxResults) => {
  const result = [];
  for (const key in checkboxResults) {
    if (checkboxResults[key] === true) {
      result.push(KEY_MAP[key]);
    }
  }
  return result.join(', ');
};
