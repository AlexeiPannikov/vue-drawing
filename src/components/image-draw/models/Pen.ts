import {Tool} from "./Tool";

export class Pen extends Tool {

    isMouseDown: boolean = false
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    listen() {
        if(!this.isSelected) return
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmouseleave = this.mouseUpHandler.bind(this)
    }

    mouseDownHandler(e: MouseEvent) {
        this.isMouseDown = true
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.color
        this.ctx.moveTo(e.pageX - (e.target as any).offsetLeft, e.pageY - (e.target as any).offsetTop)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.isMouseDown) {
            this.draw(e.pageX - (e.target as any).offsetLeft, e.pageY - (e.target as any).offsetTop)
        }
    }

    mouseUpHandler(e: MouseEvent) {
        this.isMouseDown = false
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}