const footerElement = document.createElement("footer");
footerElement.className = "footer";
document.body.append(footerElement);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector(".footer");
const copyright = document.createElement("p");
copyright.innerHTML = `© Anya Maker ${thisYear}`;
footer.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "GitHub", "Functions", "Arrays", "Loops", "DOM"];
const skillsSection = document.getElementById("Skills");
const skillsList = skillsSection.querySelector("ul");
skills.forEach(skill => {
    const li = document.createElement("li");
    li.innerText = skill;
    skillsList.appendChild(li);
})

const messageForm = document.querySelector("form[name='leave_message']");
messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const usersName = event.target.usersName.value;
    const email = event.target.email.value;
    const usersMessage = event.target.usersMessage.value;
    console.log("Name: ", usersName);
    console.log("Email: ", email);
    console.log("Message: ", usersMessage);
    const messageSection = document.getElementById("Messages");
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${email}">${usersName}</a> <span>${usersMessage}</span>`;
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", function () {
        const entry = removeButton.parentNode;
        entry.remove();
    });
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    event.target.reset();
});

fetch("https://api.github.com/users/Ashanya20/repos")
    .then(response => {
        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
    .then(repositories => {
        console.log(repositories);
        const projectSection = document.getElementById("Projects");
        if (!projectSection) {
            throw new Error("Projects section not found in DOM");
        }
        const projectList = projectSection.querySelector("ul");
        if (!projectList) {
            throw new Error("Project list (ul) not found");
        }
        // Validate API response
        if (!Array.isArray(repositories)) {
            throw new Error("Invalid response format from GitHub API");
        }
        // Clear any existing content (including old errors)
        projectList.innerHTML = '';
        // Remove any existing error messages
        const oldError = projectSection.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }
        repositories.forEach(repo => {
            const project = document.createElement("li");
            project.innerText = repo.name.toUpperCase();
            projectList.appendChild(project);
        });
        console.log("Successfully loaded repositories:", repositories);
    })
    .catch(error => {
        console.error("Failed to load repositories:", error);
        // Show user-friendly error message
        const projectSection = document.getElementById("Projects");
        if (projectSection) {
            // Check if error message already exists
            let errorMsg = projectSection.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                projectSection.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Unable to load projects. Please try again later.';
        }
    });
