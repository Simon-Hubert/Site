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
    new Project("Check Mates", "Game Dev", "https://play.google.com/store/apps/details?id=com.Mono8.CheckMates&hl=FR", "", "Les echecs mais en mieux")
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