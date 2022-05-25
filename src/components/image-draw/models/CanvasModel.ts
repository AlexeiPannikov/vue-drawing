import {Tool} from "./Tool";
import {Shape} from "./Shape";

export class CanvasModel {
    canvas:  HTMLCanvasElement = null
    tools: Tool[] = new Array<Tool>()
    // @ts-ignore
    easyC = new EasyC(this.canvas)

    initTools() {
        this.tools.push(new Tool(1, "line", new Shape(), "#ff0000"))
    }

    addShape(shape: Shape) {
        this.easyC.objects.push(shape)
    }

    deleteShape(idx: number) {
        this.easyC.objects.splice(idx, 1)
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.initTools()
    }
}