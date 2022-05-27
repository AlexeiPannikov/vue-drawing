import {Shape} from "./Shape";
import {CircleModel} from "./CircleModel";

export class CircleTool {

    id: number = 0
    canvas: HTMLCanvasElement = null
    ctx: CanvasRenderingContext2D = null
    name: string = "circle"
    shape: CircleModel = new CircleModel()
    isSelected: boolean = false
    color: string = ""
    drawWidth: number = 1
    isDrawing: boolean = false

    start(e: MouseEvent | TouchEvent) {
        this.isDrawing = true
        if (e instanceof MouseEvent) {
            this.shape.x = e.clientX - this.canvas.offsetLeft
            this.shape.y = e.clientY - this.canvas.offsetTop
        }
        if (e instanceof TouchEvent) {
            this.shape.x = e.changedTouches[0].clientX - this.canvas.offsetLeft
            this.shape.y = e.changedTouches[0].clientY - this.canvas.offsetTop
        }
    }

    draw(e: MouseEvent | TouchEvent): boolean {
        if (!this.isDrawing) return
        if (e instanceof MouseEvent) {
            let radius = e.clientX - this.canvas.offsetLeft - this.shape.x
            if (radius < 0) {
                radius = Math.abs(radius)
            }
            this.shape.radius = radius
        }
        if (e instanceof TouchEvent) {

        }
        return true
    }

    stop() {
        if (this.isDrawing) {
            this.isDrawing = false
            this.shape.radius = 0
        }
    }

    constructor(id: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, color?: string) {
        this.id = id
        this.canvas = canvas
        this.ctx = ctx
        this.color = color
        this.shape.stroke.fill = this.color
        this.shape.stroke.thick = this.drawWidth
    }
}