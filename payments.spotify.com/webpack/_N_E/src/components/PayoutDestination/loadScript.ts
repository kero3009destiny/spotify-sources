export const loadScript = async (url: string) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = false;
  document.body.appendChild(script);
  return new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
  });
};
