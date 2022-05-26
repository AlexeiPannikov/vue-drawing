import {Shape} from "./Shape";
import {PenTool} from "./PenTool";
import {Tools} from "./Tools";

type Tool = PenTool

export class CanvasModel {
    canvas: HTMLCanvasElement = null
    tools: Tools = null
    // @ts-ignore
    easyC: EasyC = null

    selectedTool() {
        return Object.entries(this.tools).find(([, value]) => value.isSelected)
    }

    selectTool(toolName: string) {
        for(let key in this.tools) {
            (this.tools as any)[key].isSelected = (this.tools as any)[key].name === toolName
        }
        console.log(this.tools.pen)
    }

    start() {
        console.log(this.tools.pen)
    }

    addShape(shape: Shape) {
        this.easyC.objects.push(shape)
    }

    deleteShape(idx: number) {
        this.easyC.objects.splice(idx, 1)
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.tools = new Tools(canvas, canvas?.getContext('2d'))
        // @ts-ignore
        this.easyC = new EasyC(canvas)
    }
}