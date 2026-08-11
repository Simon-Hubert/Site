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
    new Project("Line Circle Intersection", "Maths", "/pages/Maths/LineCircleIntersect/LineCircleIntersectionSolver.html", "/images/LineCircle.png", "Un solveur d'equation mathématiques"),
    new Project("SceneMap", "Tools", "/pages/Tools/SceneMap.html", "/images/SceneMap.gif", "Outil pour Unity permettant de relier des scenes en utilisant GraphView"),
    new Project("HierarchySequence", "Tools",  "/pages/Tools/HierarchySequence.html", "/images/HierarchySequences/Sequences-1.png", "Outil pour Unity permettant d'organiser une sequence d'action et d'evenements directement depuis la Hierarchie"),
];

function GetPageList(active){
    let PageList = ["Maths", "Tools", "VideoGames"]
    let extensionList = ["ini", "pkg", "exe"]

    let txt = "";

    if(active == "Home") txt += `<a class="active" href=""><span>Home</span><span>txt</span></a>`;
    else txt += `<a href="/index.html"><span>Home</span><span>txt</span></a>`;

    for (let i = 0; i < PageList.length; i++) {
        var element = PageList[i];
        if (active == element) txt += `<a class="active" href="/pages/${element}/main${element}.html"><span>${element}</span><span>${extensionList[i]}</span></a>`;
        else txt += `<a href="/pages/${element}/main${element}.html"><span>${element}</span><span>${extensionList[i]}</span></a>`;
    }

    return txt;
}

function SetPageList(){
    var elems = document.getElementsByClassName("pagelist");

    for (let i = 0; i < elems.length; i++) {
        const element = elems[i];
        var active = element.getAttribute(`page`);
        element.innerHTML = GetPageList(active)
    };
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}


window.onload = function(){

    shuffle(Projects)

    let projectList = document.getElementById("project-list");
    let mathList = document.getElementById("math-project-list");
    let toolList = document.getElementById("tools-project-list");
    let gameDevList = document.getElementById("gamedev-project-list");

    if(projectList){
        Projects.forEach((element) => 
            projectList.innerHTML += element
        );
    }
    SetList(mathList, "Maths");
    SetList(toolList, "Tools");
    SetList(gameDevList, "Game Dev");

    SetPageList();

    let projectWindows = document.getElementsByClassName("window");
    Array.prototype.forEach.call(projectWindows, RandomOffset);
}