import {Shape} from "./Shape";
import {PenTool} from "./PenTool";
import {CircleTool} from "./CircleTool";

export class Tools {

    pen: PenTool = null
    circle: CircleTool = null

    private initTools(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.pen = new PenTool(1, canvas, ctx, "#ff0000")
        this.circle = new CircleTool(1, canvas, ctx, "#ff0000")
    }

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.initTools(canvas, ctx)
    }
}