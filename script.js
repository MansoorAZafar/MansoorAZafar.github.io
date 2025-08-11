const loadItems = (file, containerID) => {
  fetch(file)
    .then((response) => response.json())
    .then((projects) => {
      const container = document.getElementById(containerID);
      projects.forEach((project) => {
        const projectCard = document.createElement("div");

        projectCard.classList.add("cell");
        projectCard.innerHTML = `
          <i class=${project.icon}></i>
          <span>${project.name}</span>
        `;

        container.appendChild(projectCard);
      });
    });
};

const loadProgrammingLanguages = () => {
  loadItems("languages.json", "languages");
};

const loadTechnologies = () => {
  loadItems("technologies.json", "technologies");
};

const loadFrameworks = () => {
  loadItems("frameworks.json", "frameworks");
};
// const loadProjects = () => {};

// loadProjects();
loadFrameworks();
loadTechnologies();
loadProgrammingLanguages();
