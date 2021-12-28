const popUpWidth = 480;
const popUpHeight = 800;

/**
 * centerPopUp - Opens a centered browser pop up
 * @param {object} props
 * @param {string} props.url The URL to be opened
 * @param {string} props.name The window name
 */
const centerPopUp = ({ url, name }) => {
  const left = window.screenLeft + (window.innerWidth - popUpWidth) * 0.5;
  const right = window.screenTop + (window.innerHeight - popUpHeight) * 0.25;

  window.open(
    url,
    name,
    `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${popUpWidth},height=${popUpHeight},left=${left},top=${right}`,
  );
};

export default centerPopUp;
