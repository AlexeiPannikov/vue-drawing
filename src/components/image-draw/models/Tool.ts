import {Shape} from "./Shape";

export class Tool {

    id: number = 0
    name: string = ""
    shape: Shape = new Shape()
    isSelected: boolean = false
    color: string = ""
    drawWidth: number = 2



    constructor(id: number, name: string, shape: Shape, color?: string) {
        this.id = id
        this.name = name
        this.shape = shape
        this.color = color
    }
}