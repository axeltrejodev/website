import { useEffect } from "react";
import { Link } from "react-router";

function Header() {
  useEffect(() => {
    function handleScroll() {
      const header = document.querySelector("#root > header")!;
      if (window.scrollY > 0) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-color-scheme");
    const newTheme = currentTheme == "dark" ? "light" : "dark";
    window.localStorage.setItem("color-scheme", newTheme);
    root.setAttribute("data-color-scheme", newTheme);
  }
  return (
    <header>
      <Link to="/" className="logo">
        <svg viewBox="0 0 24 32" fill="currentColor" width="1.5rem">
          <path d="M17.5 21c2.5-2 3-5 2-6s-9 5.5-8.5 7c.5 1 4 1 6.5-1ZM4 22.5c1.5 1 3 1 3.5 0s-4-3.5-4.5-3 0 2 1 3ZM12 0s0 0 0 0c7 0 12 6 12 12 0 8-4 15-10 19-2 1-2 1-4 0C4 27 0 20 0 12 0 6 5 0 12 0Z" />
        </svg>
        <span>Axel Trejo</span>
      </Link>
      <nav>
        <a href="https://www.linkedin.com/in/axeltrejodev/" target="_blank">
          <svg viewBox="0 0 16 16" fill="currentColor" width="1.5rem">
            <path d="M14.72 0H1.36C.64 0 0 .53 0 1.25v13.38c.02.75.62 1.35 1.37 1.37h13.35c.73 0 1.28-.65 1.28-1.37V1.25C16 .53 15.45 0 14.72 0ZM4.96 13.34H2.67V6.22h2.29v7.12ZM3.89 5.12h-.02c-.73 0-1.21-.55-1.21-1.23s.49-1.23 1.24-1.23 1.21.53 1.23 1.23c.02.65-.49 1.2-1.14 1.23-.03 0-.07 0-.1 0Zm9.45 8.22h-2.29v-3.9c0-.93-.34-1.57-1.16-1.57-.63 0-1.01.43-1.18.85-.06.15-.08.36-.08.56v4.06H6.34V6.22h2.29v.99c.33-.47.85-1.16 2.06-1.16 1.51 0 2.64.99 2.64 3.13v4.16Z" />
          </svg>
        </a>
        <a href="https://github.com/axeltrejodev" target="_blank">
          <svg viewBox="0 0 16 16" fill="currentColor" width="1.5rem">
            <path d="M8 0C3.58 0 0 3.67 0 8.2c-.02 3.5 2.17 6.62 5.47 7.78.04 0 .09.01.14.01.3 0 .41-.22.41-.41v-1.4c-.28.06-.55.09-.82.1-1.54 0-1.89-1.2-1.89-1.2-.36-.95-.89-1.2-.89-1.2-.7-.49 0-.5.05-.5.8.07 1.22.85 1.22.85.4.7.94.9 1.41.9.32 0 .63-.08.91-.21.07-.53.28-.89.51-1.1-1.77-.21-3.64-.91-3.64-4.05 0-.9.31-1.63.82-2.2-.24-.71-.22-1.48.08-2.17.06-.01.12-.02.18-.02.29 0 .94.11 2.02.86 1.31-.37 2.7-.37 4.01 0 1.08-.75 1.73-.86 2.02-.86.06 0 .12 0 .18.02.29.69.32 1.46.08 2.17.54.6.83 1.39.82 2.2 0 3.15-1.87 3.84-3.65 4.05.29.25.54.75.54 1.52 0 1.1-.01 1.98-.01 2.25 0 .19.11.41.41.41.05 0 .1 0 .14-.01 3.3-1.16 5.5-4.29 5.47-7.78C16 3.67 12.42 0 8 0Z" />
          </svg>
        </a>
        <button id="theme-toggle" onClick={toggleTheme}>
          <svg id="moon" viewBox="0 0 16 16" fill="currentColor" width="1.5rem">
            <path d="M7.51 0C6.34 1.1 5.6 2.66 5.6 4.39c0 3.32 2.69 6.01 6.01 6.01 1.73 0 3.29-.73 4.39-1.91-.26 4.19-3.74 7.51-7.99 7.51S0 12.41 0 7.99 3.32.26 7.51 0Z" />
          </svg>
          <svg id="sun" viewBox="0 0 16 16" fill="currentColor" width="1.5rem">
            <path d="M8 12.36c-2.41 0-4.36-1.95-4.36-4.36S5.59 3.64 8 3.64s4.36 1.95 4.36 4.36-1.95 4.36-4.36 4.36ZM7.27 0h1.45v2.18H7.27V0Zm0 13.82h1.45V16H7.27v-2.18ZM1.83 2.86l1.03-1.03 1.54 1.54-1.03 1.03-1.54-1.54Zm9.77 9.77 1.03-1.03 1.54 1.54-1.03 1.03-1.54-1.54Zm1.54-10.8 1.03 1.03-1.54 1.54-1.03-1.03 1.54-1.54ZM3.37 11.6l1.03 1.03-1.54 1.54-1.03-1.03 1.54-1.54ZM16 7.27v1.45h-2.18V7.27H16Zm-13.82 0v1.45H0V7.27h2.18Z" />
          </svg>
        </button>
      </nav>
    </header>
  );
}

export default Header;
