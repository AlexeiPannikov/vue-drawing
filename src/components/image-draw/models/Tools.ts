import {Shape} from "./Shape";
import {PenTool} from "./PenTool";

export class Tools {

    pen: PenTool = null

    private initTools(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.pen = new PenTool(1, canvas, ctx, "#ff0000")
    }

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.initTools(canvas, ctx)
    }
}