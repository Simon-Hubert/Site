class Circle{
    constructor(center, radius){
        this.center = center;
        this.radius = radius;
    }

    Draw(canvasContext2D){
        canvasContext2D.beginPath();
        canvasContext2D.arc(this.center.x, this.center.y, this.radius, 0, TAU);
        canvasContext2D.lineWidth = 3;
        canvasContext2D.strokeStyle = '#FF0000';
        canvasContext2D.stroke();
    }
}

class Line{
    constructor(point1, point2){
        this.point1 = point1;
        this.point2 = point2;
    }

    MakeInfiniteLine(){
        let AB = new Vector2(this.point2.x - this.point1.x,
                             this.point2.y - this.point1.y);
        AB.Normalise();
        
        this.infPt1 = AB.mul(1000);
        this.infPt2 = AB.mul(-1000);
    }

    Draw(canvasContext2D){
        this.MakeInfiniteLine();
        canvasContext2D.beginPath();
        canvasContext2D.moveTo(this.infPt1.x+this.point1.x, this.infPt1.y + this.point1.y);
        canvasContext2D.lineTo(this.infPt2.x+this.point1.x, this.infPt2.y + this.point1.y);
        canvasContext2D.lineWidth = 3;
        canvasContext2D.strokeStyle = '#FF0000';
        canvasContext2D.stroke();
    }
}

function DrawCanvas(canvas, circle, line){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        console.log(line);
        circle.Draw(ctx);
        line.Draw(ctx);
    }
}

//Not mine https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
//too javascripty I couldn't
function setInputFilter(textbox, inputFilter, errMsg) {
    [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(
        function(event) {
        textbox.addEventListener(event, 
            function(e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
                this.classList.remove("input-error");
                this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            }
            else if (this.hasOwnProperty("oldValue")) {
                // Rejected value: restore the previous one.
                this.classList.add("input-error");
                //this.setCustomValidity(errMsg);
                //this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
            else {
                // Rejected value: nothing to restore.
                this.value = "";
            }
        });
    });
}

function SetNumberFilter(element) {
    setInputFilter(element,
        function(value) {
            return /^\d*\.?\d*$/.test(value);
        },
        "Only digits and '.' are allowed"
    );
}

let inputboxes = document.querySelectorAll("input")
Array.prototype.forEach.call(inputboxes, SetNumberFilter);

let C = new Circle(new Vector2(0,0), 0);
let D = new Line(new Vector2(0,0), new Vector2(0,0));


function SetVar(index){
    return function(event){
        data[index] = parseFloat(event.target.value);
        
    }
}

let data = {
    Cx: 0,
    Cy: 0,
    R: 0,
    p1x: 0,
    p1y: 0,
    p2x: 0,
    p2y: 0
}

document.getElementById("circle-center-x").addEventListener("input", SetVar("Cx"));
document.getElementById("circle-center-y").addEventListener("input", SetVar("Cy"));
document.getElementById("radius").addEventListener("input", SetVar("R"));
document.getElementById("point1-x").addEventListener("input", SetVar("p1x"));
document.getElementById("point1-y").addEventListener("input", SetVar("p1y"));
document.getElementById("point2-x").addEventListener("input", SetVar("p2x"));
document.getElementById("point2-y").addEventListener("input", SetVar("p2y"));


const mainCanvas = document.getElementById("main-canvas");
function Update(){

    C.center.x = data["Cx"];
    C.center.y = data["Cy"];
    C.radius = data["R"];
    D.point1.x = data["p1x"];
    D.point1.y = data["p1y"];
    D.point2.x = data["p2x"];
    D.point2.y = data["p2y"];
    DrawCanvas(mainCanvas, C, D)
};

document.getElementById("circle-center-x").addEventListener("input", Update);
document.getElementById("circle-center-y").addEventListener("input", Update);
document.getElementById("radius").addEventListener("input", Update);
document.getElementById("point1-x").addEventListener("input", Update);
document.getElementById("point1-y").addEventListener("input", Update);
document.getElementById("point2-x").addEventListener("input", Update);
document.getElementById("point2-y").addEventListener("input", Update);

