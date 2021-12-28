export function copyUrlToClipboard(
  inputHTMLElement: HTMLInputElement,
  target: HTMLButtonElement
) {
  if (typeof window !== 'undefined') {
    // the actual, to be copied url
    const copyUrl = window.location.href;

    const displayUrl = window.location.host + window.location.pathname;
    inputHTMLElement.value = copyUrl;
    inputHTMLElement.select();

    // Required for iOS
    // See also https://stackoverflow.com/a/54966926/45974
    inputHTMLElement.setSelectionRange(0, inputHTMLElement.value.length);

    // Copy input value
    try {
      if (!document.execCommand('copy')) {
        throw new Error(`failed to copy`);
      }
    } catch (e) {
      // console.log('Warning! Could not copy to clipboard.', e);
    }

    // Restore the pretty display url
    inputHTMLElement.value = displayUrl;

    // Deselect the input
    inputHTMLElement.setSelectionRange(0, 0);

    target.focus();
  }
}
