import me from "../assets/me.webp";

function About() {
  return (
    <section className="portfolio-about">
      <img src={me} alt="Axel Trejo's Profile Photo" />
      <div className="text">
        <h1>Axel Trejo</h1>
        <h2>Full Stack Developer</h2>
      </div>
      <a href="https://www.linkedin.com/in/axeltrejodev/" target="_blank">
        Contact
      </a>
    </section>
  );
}

export default About;
