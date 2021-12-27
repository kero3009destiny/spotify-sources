export class AdNotFoundError implements Error {
  constructor(message: string) {
    this.name = 'AdNotFoundError';
    this.message = message;
  }

  public name: string;
  public message: string;
}

export async function getAdsCSVExportData(url: string) {
  return await fetch(url, { mode: 'cors' }).then(r => {
    switch (r.status) {
      case 200:
        return r.text().then(payload => {
          return payload;
        });
      default:
        return Promise.reject(r);
    }
  });
}
