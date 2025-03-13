import { useEffect } from "react";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import "./index.css";

function Portfolio() {
  useEffect(() => {
    document.title = "Axel Trejo - Portfolio";
  }, []);
  return (
    <>
      <About />
      <Skills />
      <Projects />
    </>
  );
}

export default Portfolio;
