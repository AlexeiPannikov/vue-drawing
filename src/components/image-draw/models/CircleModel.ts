export class CircleModel {

    type = "circle"
    x: number = null
    y: number = null
    radius: number = 0
    stroke = {fill: "", thick: 1}

    constructor(obj?: Partial<CircleModel>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}
