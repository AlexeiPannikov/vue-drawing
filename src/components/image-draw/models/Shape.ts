export class Shape {



    constructor(obj?: Partial<Shape>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}