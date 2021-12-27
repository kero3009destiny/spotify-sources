export function mapBgStockMusic(t) {
  return {
    id: t.id,
    uri: t.previewUri || t.asset_url,
    name: t.name,
    genre: t.genre,
    locale: t.locale,
  };
}
