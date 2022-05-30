import {Pen} from "./Pen";
import {Circle} from "./Circle";

export class Sheet {

    canvas: HTMLCanvasElement = null
    pen: Pen = null
    circle: Circle = null

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.circle = new Circle(canvas)
        this.pen = new Pen(canvas)
    }

    get selectedToolName() {
        let name = ""
        Object.entries(this).forEach(([key, value]) => {
            if (value?.isSelected) {
                name = key
            }
        })
        return name
    }

    setImage(img: HTMLImageElement) {
        this.canvas.getContext('2d').drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    }

    selectTool(toolName: string) {
        this.pen.destroyEvents()
        this.circle.destroyEvents()
        Object.entries(this).forEach(([key, value]) => {
            if (toolName !== key) {
                value.isSelected = false
            } else {
                value.isSelected = true
                value.listen()
            }
        })
    }
}