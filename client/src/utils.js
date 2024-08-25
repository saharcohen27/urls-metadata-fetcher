export default function isValidUrl(url) {
  // Regular expression for URL validation
  const urlRegex =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;

  // Test the given URL against the regex
  return urlRegex.test(url) || url === "tryerror";
}

export function changeVal(prevArr, index, newVal) {
  const newArr = [...prevArr];
  newArr[index] = newVal;
  return newArr;
}

export function addValue(prevArr, value) {
  return [...prevArr, value];
}

export function allValidURLs(urls) {
  for (const url of urls) {
    if (!isValidUrl(url)) {
      return false;
    }
  }
  return true;
}
