// Function used for setting margins of the album art in this component
export const getRandomInt = (min: number, max: number) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt; //The maximum is exclusive and the minimum is inclusive
};

// Function for capitalizing all words within a string
export const capitalize = (string: string) => {
  return string.replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase();
  });
};

// Function for splitting an array of items into a group of arrays of the items
export const splitItems = (items: Array<any>, groupBy: number) => {
  let itemsCopy = [...items];
  let splitItemsArr: any = [];
  while (itemsCopy.length > 0) {
    splitItemsArr = [...splitItemsArr, itemsCopy.splice(0, groupBy)];
  }
  return splitItemsArr;
};