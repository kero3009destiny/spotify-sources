// ignore-string-externalization
export var isSelectedArtist = function isSelectedArtist(candidate) {
  return typeof candidate === 'object' && typeof candidate.id === 'string' && typeof candidate.type === 'string' && typeof candidate.uri === 'string' && typeof candidate.href === 'string' && typeof candidate.images === 'object' && typeof candidate.name === 'string' && typeof candidate.popularity === 'number' && typeof candidate.external_urls === 'object' && typeof candidate.followers === 'object' && typeof candidate.isClaimed === 'boolean';
};