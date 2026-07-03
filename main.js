class Project{
    constructor(name, topic, link, image, description){
        this.name = name;
        this.topic = topic;
        this.link = link;
        this.image = image;
        this.description = description;
    }
    
    toString(){
        return `<div class="window">
                    <div class="header">
                        <h1>${this.name}</h1>
                        <div class="cross">X</div>
                    </div>
                    <div class="window-content">
                        <div class="txt-content">
                            <img src="${this.image}" alt="">
                            <p>${this.description}</p>
                        </div>
                        <div class="window-buttons">
                            <button onclick="window.location.href='${this.link}'">GO TO</button>
                        </div>
                    </div>
                </div>`;
    }

}

class GameProject extends Project{
    constructor(name, link, image, description, engine, year, team){
        super(name, "Game Dev", link, image, description);
        this.engine = engine;
        this.year = year;
        this.team = team;
    }

    toString(){
        return `<div class="window">
                    <div class="header">
                        <h1>${this.name}</h1>
                        <div class="cross">X</div>
                    </div>
                    <div class="window-content">
                        <div class="txt-content">
                            <img src="${this.image}" alt="">
                            <p>${this.description}</p>
                        </div>
                        <p>${this.engine} - ${this.year} - ${this.team} people </p>
                        <div class="window-buttons">
                            <button onclick="window.location.href='${this.link}'">GO TO</button>
                        </div>
                    </div>
                </div>`;
    }
}

function RandomOffset(element){
    let length = 80;
    let x = Math.floor((Math.random()-0.5)*length);
    let y = Math.floor((Math.random()-0.5)*length);
    element.style.transform = `translate(${x}px,${y}px)`;
}

function SetList(list, name){
    if(list){
        Projects.forEach((element) => {
            if(element.topic == name){
                list.innerHTML += element
            }
        });
    }
}

let Projects = [
    new GameProject("Check Mates", "https://vanillou-39.itch.io/check-mates", "/images/CheckMates.png", "Puzzles d'échec revisités avec de nouvelles règles et des pouvoirs !", "Unity", "2023", "8"),
    new GameProject("StationLess", "https://steambotart.itch.io/stationless", "/images/StationLess.png", "Metro Boulot Dodo dans une experience narrative", "Unity", "2026", "15"),
    new GameProject("Out of Reach", "https://elfumisto.itch.io/out-of-reach", "/images/OutOfReach.png", "Jeu VR d'exploration Spaciale", "Unreal", "2026", "12"),
    new GameProject("8th Turtle Street", "https://eleanoretht.itch.io/8-turtle-street", "/images/8TurtleStreet.png", "Jeu mobile narratif dans une sorée etudiante", "Unity", "2023", "8"),
    new GameProject("Lizzzard Wizards", "https://sakripan.itch.io/lizzzard-wizard", "/images/LizzzardWizard.jpg", "Couch Game de coopétition ou des lezards cambriolent une école de magie", "Unreal", "2024", "11"),
    new Project("Line Circle Intersection", "Maths", "pages/Maths/LineCircleIntersect/LineCircleIntersectionSolver.html", "", "Un solveur d'equation mathématiques"),
];


window.onload = function(){

    let projectList = document.getElementById("project-list");
    let mathList = document.getElementById("math-project-list");
    let musicList = document.getElementById("music-project-list");
    let gameDevList = document.getElementById("gamedev-project-list");

    if(projectList){
        Projects.forEach((element) => 
            projectList.innerHTML += element
        );
    }
    SetList(mathList, "Maths");
    SetList(musicList, "Music");
    SetList(gameDevList, "Game Dev");

    let projectWindows = document.getElementsByClassName("window");
    Array.prototype.forEach.call(projectWindows, RandomOffset);
}