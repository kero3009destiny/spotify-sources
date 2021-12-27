function gTagManager(tag) {
  try {
    window.dataLayer.push(tag);
  } catch (e) {
    // console.error(e)
  }
}

export default gTagManager;
