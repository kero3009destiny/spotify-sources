export function downloadTargetingList(countryCode: string, locale: string) {
  const elem = window.document.createElement('a');
  const fileName = `adstudio_geo_${countryCode}_${locale}.xlsx`;
  elem.href = `https://adstudio-bulksheets.spotifycdn.com/${fileName}`;
  elem.download = fileName;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}
