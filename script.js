class ContainerStrategy {
  build(project) {
    throw new Error("Need Implement Build(project)");
  }
}

class CellStrategy extends ContainerStrategy {
  build(project) {
    const projectCard = document.createElement("div");

    projectCard.classList.add("cell");
    projectCard.innerHTML = `
          <i class="${project.icon}"></i>
          <span>${project.name}</span>
        `;
    return projectCard;
  }
}

class CardHeroStrategy extends ContainerStrategy {
  build(project) {
    const projectDetails = document.createElement("div");
    projectDetails.classList.add("project-details");

    projectDetails.innerHTML = `
      <div class="project-icon">
          <i class="${project.icon}"></i>
          <img src=${project.image} alt=${project.alt} class="project-image">
      </div>
      <h3>${project.name}</h3>
      <p> ${project.description} </p>
      <div class="project-github">
          <a href=${project.github} target="_blank">
              <i class="fa-brands fa-github"></i>
              <span>GitHub</span>                        
          </a>
      </div>
    `;

    return projectDetails;
  }
}

class ExperienceStrategy extends ContainerStrategy {
  build(experience) {
    const experienceCard = document.createElement("div");
    experienceCard.classList.add("details");

    experienceCard.innerHTML = `
        <div class="header">
            <img
                class="logo"
                src="${experience.icon}"
                alt="${experience.alt || experience.company}"
            >

            <div class="header-content">
                <h3>${experience.position}</h3>

                <div class="bottom">
                    <p class="company">
                        ${experience.company} · ${experience.location}
                    </p>
                    <p class="timeframe">${experience.timeframe}</p>
                </div>
            </div>
        </div>

        <ul class="experience-points">
            ${experience.points.map(point => `<li>${point}</li>`).join("")}
        </ul>

        <hr>
    `;

    return experienceCard;
  };
}

const loadItems = (file, containerID, strategy) => {
  const container = document.getElementById(containerID);
  fetch(file)
    .then((response) => response.json())
    .then((projects) => {
      projects.forEach((project) => {
        const projectCard = strategy.build(project);
        container.appendChild(projectCard);
      });
    });
};

const loadExperiences = (strategy) => {
  loadItems("data/experience.json", "experiences", strategy);
};

const loadProgrammingLanguages = (strategy) => {
  loadItems("data/languages.json", "languages", strategy);
};

const loadTechnologies = (strategy) => {
  loadItems("data/technologies.json", "technologies", strategy);
};

const loadFrameworks = (strategy) => {
  loadItems("data/frameworks.json", "frameworks", strategy);
};

const loadProjects = async (strategy) => {
  const container = document.getElementById("projects");
  const filters = document.getElementById("project-filters");
  const response = await fetch("data/projects.json");
  const projects = await response.json();
  const types = [...new Set(projects.map((project) => project.type).filter(Boolean))];
  const defaultType = types.includes("Full-Stack") ? "Full-Stack" : types[0];

  filters.innerHTML = types.map((type) => `
    <label class="project-filter${type === defaultType ? " is-active" : ""}">
      <input type="radio" name="project-type" value="${type}"${type === defaultType ? " checked" : ""}>
      <span>${type}</span>
    </label>
  `).join("");

  const renderProjects = (selectedType = defaultType) => {
    container.replaceChildren(...projects
      .filter((project) => project.type === selectedType)
      .map((project) => strategy.build(project)));
  };

  filters.addEventListener("change", (event) => {
    if (event.target.matches('input[name="project-type"]')) {
      filters.querySelectorAll(".project-filter").forEach((label) => {
        label.classList.toggle("is-active", label.contains(event.target));
      });
      renderProjects(event.target.value);
    }
  });

  if (defaultType) renderProjects();
};

let experienceStrategy = new ExperienceStrategy();
let cellStrategy = new CellStrategy();
let cardHeroStrategy = new CardHeroStrategy();

loadExperiences(experienceStrategy);
loadProjects(cardHeroStrategy);
loadFrameworks(cellStrategy);
loadTechnologies(cellStrategy);
loadProgrammingLanguages(cellStrategy);

experienceStrategy = null;
cellStrategy = null;
cardHeroStrategy = null;
