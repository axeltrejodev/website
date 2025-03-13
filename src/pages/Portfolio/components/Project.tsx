import { Link } from "react-router";
import Technology from "./Technology";
import { type Project as ProjectType } from "../types";

type Props = {
  project: ProjectType;
};

function Project({ project }: Props) {
  return (
    <div className="project">
      <img
        src={project.image}
        alt={`${project.title} Preview`}
        loading="lazy"
      />
      <div className="description">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="technologies">
          {project.technologies.map((technology, index) => (
            <Technology key={index} name={technology} />
          ))}
        </ul>
        <div className="buttons">
          <a href={project.sourceCode} target="_blank">
            <i className="ri-code-line" />
            &nbsp;Source Code
          </a>
          {!project.external ? (
            <Link to={project.visit}>
              <i className="ri-rocket-line" />
              &nbsp;Visit
            </Link>
          ) : (
            <a href={project.visit} target="_blank">
              <i className="ri-rocket-line" />
              &nbsp;Visit
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project;
