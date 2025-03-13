import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import shortenUrl from "./services/shortener";
import "./index.css";

function Shortener() {
  useEffect(() => {
    document.title = "Axel Trejo - URL Shortener";
  }, []);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newUrl = e.currentTarget.value;
    setUrl(newUrl);
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const shortenedUrl = await shortenUrl(url);
    setLoading(false);
    setUrl(shortenedUrl);
  }
  return (
    <>
      <h1>URL Shortener</h1>
      <form className="shortener-form" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="https://example.com"
          onChange={handleChange}
          value={url}
        />
        <button>
          <i className="ri-scissors-cut-line" />
        </button>
      </form>
      {loading && <div className="spinner" />}
    </>
  );
}

export default Shortener;
