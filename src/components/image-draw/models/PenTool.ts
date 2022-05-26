import {Shape} from "./Shape";

export class PenTool {

    id: number = 0
    canvas: HTMLCanvasElement = null
    ctx: CanvasRenderingContext2D = null
    name: string = "pen"
    shape: Shape = new Shape()
    isSelected: boolean = false
    color: string = ""
    drawWidth: number = 2
    isDrawing: boolean = false

    start(e: MouseEvent | TouchEvent) {
        this.isDrawing = true
        this.ctx.beginPath()
        if (e instanceof MouseEvent) {
            this.ctx.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
        }
        if (e instanceof  TouchEvent) {
            this.ctx.moveTo(e.changedTouches[0].clientX - this.canvas.offsetLeft, e.changedTouches[0].clientY - this.canvas.offsetTop)
        }
    }

    draw(e: MouseEvent | TouchEvent) {
        if (!this.isDrawing) return
        if (e instanceof MouseEvent) {
            this.ctx.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
        }
        if (e instanceof  TouchEvent) {
            this.ctx.lineTo(e.changedTouches[0].clientX - this.canvas.offsetLeft, e.changedTouches[0].clientY - this.canvas.offsetTop)
        }
        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = this.drawWidth
        this.ctx.lineCap = "round"
        this.ctx.lineJoin = "round"
        this.ctx.stroke()
    }

    stop() {
        if (this.isDrawing) {
            this.ctx.stroke()
            this.ctx.closePath()
            this.isDrawing = false
        }
    }

    constructor(id: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, color?: string) {
        this.id = id
        this.canvas = canvas
        this.ctx = ctx
        this.color = color
    }
}