import Project from "./Project";
import { type Project as ProjectType } from "../types";
import youtubeClone from "../assets/youtube-clone.webp";
import shoppingCart from "../assets/shopping-cart.webp";
import movieFinder from "../assets/movie-finder.webp";
import chat from "../assets/chat.webp";
import translator from "../assets/translator.webp";
import shortener from "../assets/shortener.webp";
import toDo from "../assets/to-do.webp";
import ticTacToe from "../assets/tic-tac-toe.webp";

const projects: ProjectType[] = [
  {
    image: youtubeClone,
    title: "YouTube Clone",
    description:
      "A clone of the YouTube frontend using the Data API v3 and state handling using contexts, made in React with TypeScript.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode: "https://github.com/axeltrejodev/youtube-clone/tree/master",
    visit: "https://axeltrejodev.github.io/youtube-clone",
    external: true,
  },
  {
    image: shoppingCart,
    title: "Shopping Cart",
    description:
      "A simple example of a shopping cart made in React with TypeScript, with state handling using contexts and extracting data from a JSON file.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode:
      "https://github.com/axeltrejodev/website/tree/master/src/pages/ShoppingCart",
    visit: "/shopping-cart",
    external: false,
  },
  {
    image: movieFinder,
    title: "Movie Finder",
    description:
      "Search engine for movies, TV shows and people using The Movie DB API, made in React with TypeScript.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode:
      "https://github.com/axeltrejodev/website/tree/master/src/pages/MovieFinder",
    visit: "/movie-finder",
    external: false,
  },
  {
    image: chat,
    title: "Chat with AI",
    description:
      "Chat application made in React with TypeScript that uses the ChatGPT API to generate quality responses.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode:
      "https://github.com/axeltrejodev/website/tree/master/src/pages/Chat",
    visit: "/chat",
    external: false,
  },
  {
    image: translator,
    title: "Translator",
    description:
      "Translator made in React with TypeScript that uses the ChatGPT API to generate quality translations.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode:
      "https://github.com/axeltrejodev/website/tree/master/src/pages/Translator",
    visit: "/translator",
    external: false,
  },
  {
    image: shortener,
    title: "URL Shortener",
    description:
      "Simple URL shortener that uses an external API to work made in React with TypeScript.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode:
      "https://github.com/axeltrejodev/website/tree/master/src/pages/Shortener",
    visit: "/shortener",
    external: false,
  },
  {
    image: toDo,
    title: "ToDo List",
    description:
      "To-do list manager made in React with TypeScript, with state handling using contexts and data persistence in local storage.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode:
      "https://github.com/axeltrejodev/website/tree/master/src/pages/ToDo",
    visit: "/to-do",
    external: false,
  },
  {
    image: ticTacToe,
    title: "Tic Tac Toe",
    description:
      "The classic game made in React with TypeScript, with state handling using contexts and data persistence in local storage.",
    technologies: ["React", "TypeScript", "CSS"],
    sourceCode:
      "https://github.com/axeltrejodev/website/tree/master/src/pages/TicTacToe",
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
