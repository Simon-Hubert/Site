function setGlitch(element){
    let save = element.outerHTML;
    let blurred = element.outerHTML.replace("glitch", "blurred");
    element.outerHTML = `<div class='wrapper'><div class='blurred-wrapper'>${blurred}</div>${save}</div>`;
}

let glitchElements = document.getElementsByClassName("glitch");
Array.prototype.forEach.call(glitchElements, setGlitch);