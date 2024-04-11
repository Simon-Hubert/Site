const TAU = 6.28318530718;

function isScalar(k) { return typeof(k) == "number" }

function isVector2(x) { return x instanceof Vector2 };
class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    valueOf(){ throw "nanananan (c'est un vecteur)"}

    mul(v){
        if(isVector2(v)) return new Vector2(this.x*v.x, this.y*v.y);
        if(isScalar(v)) return new Vector2(this.x*v, this.y*v);
    }

    SqrMagnitude(){ return this.x*this.x + this.y*this.y; }
    Magnitude(){ return Math.sqrt(this.SqrMagnitude()); }

    Normalise(){
        let mag = this.Magnitude();
        this.x /= mag;
        this.y /= mag;
    }

    Normalised(){
        let mag = this.Magnitude();
        return new Vector2(this.x/mag, this.y/mag);
    }
}
