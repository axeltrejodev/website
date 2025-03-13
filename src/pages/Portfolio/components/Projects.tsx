import Project from "./Project";
import { type Project as ProjectType } from "../types";
import shoppingCart from "../assets/shopping-cart.webp";
import movieFinder from "../assets/movie-finder.webp";
import translator from "../assets/translator.webp";
import shortener from "../assets/shortener.webp";
import toDo from "../assets/to-do.webp";
import ticTacToe from "../assets/tic-tac-toe.webp";

const projects: ProjectType[] = [
  {
    image: shoppingCart,
    title: "Shopping Cart",
    description:
      "A simple example of a shopping cart made in React with TypeScript, with state handling using contexts and extracting data from a JSON file.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode: "https://github.com/axeltrejodev",
    visit: "/shopping-cart",
    external: false,
  },
  {
    image: movieFinder,
    title: "Movie Finder",
    description:
      "Search engine for movies, TV shows and people using The Movie DB API, made in React with TypeScript.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode: "https://github.com/axeltrejodev",
    visit: "/movie-finder",
    external: false,
  },
  {
    image: translator,
    title: "Translator",
    description:
      "Translator made in React with TypeScript that uses the ChatGPT API to generate quality translations.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode: "https://github.com/axeltrejodev",
    visit: "/translator",
    external: false,
  },
  {
    image: shortener,
    title: "URL Shortener",
    description:
      "Simple URL shortener that uses an external API to work made in React with TypeScript.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode: "https://github.com/axeltrejodev",
    visit: "/shortener",
    external: false,
  },
  {
    image: toDo,
    title: "ToDo List",
    description:
      "To-do list manager made in React with TypeScript, with state handling using contexts and data persistence in local storage.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode: "https://github.com/axeltrejodev",
    visit: "/to-do",
    external: false,
  },
  {
    image: ticTacToe,
    title: "Tic Tac Toe",
    description:
      "The classic game made in React with TypeScript, with state handling using contexts and data persistence in local storage.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode: "https://github.com/axeltrejodev",
    visit: "/tic-tac-toe",
    external: false,
  },
];

function Projects() {
  return (
    <section className="portfolio-projects">
      <h2>Projects</h2>
      <div className="projects">
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
