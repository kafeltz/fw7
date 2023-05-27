// https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/
export function isValidUrl(url : string) : boolean {
  try {
    const newUrl = new URL(url);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}
