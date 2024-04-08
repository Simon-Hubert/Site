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

let Chess3 = new Project("Check Mates", "Game Dev", "", "", "Les echecs mais en mieux")

window.onload = function(){

    document.getElementById("project-list").innerHTML = 
    Chess3;

    let projectWindows = document.getElementsByClassName("window");
    Array.prototype.forEach.call(projectWindows, RandomOffset);
}