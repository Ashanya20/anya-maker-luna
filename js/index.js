const foot = document.createElement('footer');
foot.className = 'footer';
document.body.append(foot);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('.footer');
const copyright = document.createElement('p');
copyright.innerHTML = `© Anya Maker ${thisYear}`;
footer.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "GitHub", "Functions", "Arrays", "Loops", "DOM"];
const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');
skills.forEach(skill => {
    const li = document.createElement('li');
    li.innerText = skill;
    skillsList.appendChild(li);
})
