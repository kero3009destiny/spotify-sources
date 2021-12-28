interface HashStringList {
  [key: string]: string;
}

export function getHashString() {
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial: HashStringList, item: string) => {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  return hash;
}

export function removeHashString() {
  history.pushState(
    '',
    document.title,
    `${window.location.pathname}${window.location.search}`
  );
}
