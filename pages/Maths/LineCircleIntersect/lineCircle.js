let contentColor = getComputedStyle(document.body).getPropertyValue('--cntcol');

class Circle{
    constructor(center, radius){
        this.center = center;
        this.radius = radius;
    }



    Draw(canvasContext2D){
        let c = ToCanvasSpace(this.center);
        canvasContext2D.beginPath();
        canvasContext2D.arc(c.x, c.y, this.radius * 25, 0, TAU);
        canvasContext2D.lineWidth = 3;
        canvasContext2D.strokeStyle = contentColor;
        canvasContext2D.stroke();
    }
}

class Line{
    constructor(point1, point2){
        this.point1 = point1;
        this.point2 = point2;
    }

    MakeInfiniteLine(p1, p2){
        let AB = new Vector2(p2.x - p1.x,
                             p2.y - p1.y);
        AB.Normalise();
        
        this.infPt1 = AB.mul(1000);
        this.infPt2 = AB.mul(-1000);
    }

    Draw(canvasContext2D){
        
        let cp1 = ToCanvasSpace(this.point1);
        let cp2 = ToCanvasSpace(this.point2);
        this.MakeInfiniteLine(cp1, cp2);

        new Circle(this.point1,0.1).Draw(canvasContext2D);
        new Circle(this.point2,0.1).Draw(canvasContext2D);

        canvasContext2D.beginPath();
        canvasContext2D.moveTo(this.infPt1.x+ cp1.x, this.infPt1.y + cp1.y);
        canvasContext2D.lineTo(this.infPt2.x + cp2.x, this.infPt2.y + cp2.y);
        canvasContext2D.lineWidth = 3;
        canvasContext2D.strokeStyle = contentColor;
        canvasContext2D.stroke();
    }
}

function ToCanvasSpace(v){
    cvs = v.copy();
    cvs.y *= -1;
    cvs = cvs.add(10);
    cvs = cvs.mul(25);
    return cvs;
}

function DrawCanvas(canvas, circle, line, p1, p2){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        circle.Draw(ctx);
        p1.Draw(ctx);
        p2.Draw(ctx);
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
            return /^[+-]?\d*\.?\d*$/.test(value);
        },
        "Only digits and '.' are allowed"
    );
}

function SetVar(index){
    return function(event){
        data[index] = parseFloat(event.target.value);
        
    }
}

function Update(){

    UpdateInput();
    UpdateOutput(); 
    DrawCanvas(mainCanvas, C, D, IP1, IP2);
};

function UpdateInput(){
    C.center.x = data["Cx"];
    C.center.y = data["Cy"];
    C.radius = data["R"];
    D.point1.x = data["p1x"];
    D.point1.y = data["p1y"];
    D.point2.x = data["p2x"];
    D.point2.y = data["p2y"];
}

function UpdateOutput(){
    let interPoints = LineInterCircle(C.center, C.radius, D.point1, D.point2);
    
    if(interPoints != undefined){
        IP1.center = interPoints[0];
        IP2.center = interPoints[1];
    }
    else{
        IP1.center= new Vector2(1000,1000);
        IP2.center= new Vector2(1000,1000);
    }
}

function LineInterCircle(center, radius, pt1, pt2){
    let a = pt2.y - pt1.y;
    let b = pt2.x - pt1.x;
    let c = -(pt1.y*pt2.x) + pt1.x*pt2.y;

    let invert = b==0;
    if(invert){
        a = pt2.x - pt1.x;
        b = pt2.y - pt1.y;
    }

    let m = (a/b)*(a/b) + 1;
    let n = 2*(a*c/(b*b) - a*center.y/b - center.x);
    let o = center.x*center.x + (c/b - center.y)*(c/b - center.y) - radius*radius;

    console.log(`M : ${m}`);
    console.log(`N : ${n}`);
    console.log(`O : ${o}`);

    let Delta = n*n - 4*(m*o);

    if( Delta < 0){
        console.log("Pas de solution ou une solution complexe.")
        return;
    }

    let x1 = (-n + Math.sqrt(Delta))/(2*m);
    let x2 = (-n - Math.sqrt(Delta))/(2*m);
    let y1 = (a * x1 + c)/b;
    let y2 = (a * x2 + c)/b;

    if(invert){
        return [new Vector2(y1, x1), new Vector2(y2, x2)];
    }

    return [new Vector2(x1, y1), new Vector2(x2, y2)];
}

let inputboxes = document.querySelectorAll("input")
Array.prototype.forEach.call(inputboxes, SetNumberFilter);

let C = new Circle(new Vector2(0,0), 0);
let D = new Line(new Vector2(0,0), new Vector2(0,0));
let IP1 = new Circle(new Vector2(0,0),0.1);
let IP2 = new Circle(new Vector2(0,0),0.1);

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

document.getElementById("circle-center-x").addEventListener("input", Update);
document.getElementById("circle-center-y").addEventListener("input", Update);
document.getElementById("radius").addEventListener("input", Update);
document.getElementById("point1-x").addEventListener("input", Update);
document.getElementById("point1-y").addEventListener("input", Update);
document.getElementById("point2-x").addEventListener("input", Update);
document.getElementById("point2-y").addEventListener("input", Update);