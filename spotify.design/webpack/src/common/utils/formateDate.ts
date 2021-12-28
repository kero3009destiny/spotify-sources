export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const options = {
    month: 'long',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
