class Engine{
    constructor(name, logo){
        this.name = name;
        this.logo = logo;
    }
}

let gameDevList;

let Engines = [
    new Engine("All", ""),
    new Engine("Unity", ""),
    new Engine("Unreal", "")
]

function SetMultiButton(){
    let container = document.getElementById("multi_button");
    for (let i = 0; i < Engines.length; i++) {
        const element = Engines[i];
        var but = document.createElement("button")
        var content = document.createTextNode(element.name);
        but.classList.add("multi_button_child");
        but.appendChild(content);
        but.onclick = SortBy.bind(but, i)
        container.appendChild(but)
    };
}

function SortBy(index){
    gameDevList.innerHTML = "";
    if(index == 0){
        SetList(gameDevList, "Game Dev");
    }
    else{
        Projects.forEach((element) => {
            if(element.engine == Engines[index].name){
                gameDevList.innerHTML += element
            }
        });
    }
    let buttons = document.getElementsByClassName("multi_button_child");
    for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        if (i == index) element.classList.add("active");
        else element.classList.remove("active")
        
    }
}

window.onload = function(){
    gameDevList = document.getElementById("gamedev-project-list");
    SetList(gameDevList, "Game Dev");

    SetPageList();
    SetMultiButton();
    let buttons = document.getElementsByClassName("multi_button_child");
    buttons[0].classList.add("active");
}

