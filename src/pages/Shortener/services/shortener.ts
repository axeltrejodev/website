const API_ENDPOINT_URL = "https://www.shareaholic.com/v2/share/shorten_link";
const API_KEY = "8943b7fd64cd8b1770ff5affa9a9437b";

async function shortenUrl(url: string) {
  /* cspell:disable-next-line */
  const res = await fetch(`${API_ENDPOINT_URL}?apikey=${API_KEY}&url=${url}`);
  return (await res.json()).data;
}

export default shortenUrl;
