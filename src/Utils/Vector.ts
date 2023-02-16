export class Vector {
    constructor(public x: number, public y: number) { }

    public get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): Vector {
        const magnitude = this.magnitude;
        if (magnitude === 0) return new Vector(0, 0);
        else return new Vector(this.x / magnitude, this.y / magnitude);
    }
}