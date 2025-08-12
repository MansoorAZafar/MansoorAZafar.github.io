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

const loadProgrammingLanguages = (strategy) => {
  loadItems("data/languages.json", "languages", strategy);
};

const loadTechnologies = (strategy) => {
  loadItems("data/technologies.json", "technologies", strategy);
};

const loadFrameworks = (strategy) => {
  loadItems("data/frameworks.json", "frameworks", strategy);
};

const loadProjects = (strategy) => {
  loadItems("data/projects.json", "projects", strategy);
};

let cellStrategy = new CellStrategy();
let cardHeroStrategy = new CardHeroStrategy();

loadProjects(cardHeroStrategy);
loadFrameworks(cellStrategy);
loadTechnologies(cellStrategy);
loadProgrammingLanguages(cellStrategy);

cellStrategy = null;
cardHeroStrategy = null;

/*
<div class="project-details">
  <div class="project-icon">
      <i class="fa-solid fa-gamepad"></i>
      <img src="images/SpaceGame.webp" alt="Picture of Space Shooter Game GUI" class="project-image">
  </div>
  <h3>Space Shooter Game</h3>
  <p>Java Swing-based 2D space shooter game where you control a spaceship and shoot down an enemy ship. The game is bullet hell style with only one enemy ship on the screen at a time. It features multiple difficulty levels and a game history system.</p>
  <p> This was built with Java Swing for the GUI and uses a game loop on a different thread to handle the game logic and rendering. The game history system is implemented using a simple file-based storage system.</p>
  <p> This was built by myself for a school project, focusing on object-oriented programming principles. This was actually my first ever coding project, and as a result, it holds a special place in my portfolio.</p>
  <div class="project-github">
      <a href="https://github.com/Pawanjot-Randhawa/Space_Shooter_Game" target="_blank">
          <i class="fa-brands fa-github"></i>
          <span>GitHub</span>                        
      </a>
  </div>
</div>
*/
