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

    public dot(v: Vector): number {
        return this.x * v.y + this.y * v.x;
    }

    public det(v: Vector): number {
        return this.x * v.y - this.y * v.x;
    }

    public angleBetween(v: Vector): number {
        return Math.atan2(this.det(v), this.dot(v));
    }
}