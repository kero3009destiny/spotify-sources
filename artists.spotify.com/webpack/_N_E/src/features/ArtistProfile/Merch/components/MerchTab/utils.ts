export var stripHtml = function stripHtml(s) {
  return s.replace(/<[^>]*>/g, '');
};