import {Tool} from "./Tool";

export class Pen extends Tool {

    isMouseDown: boolean = false

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    listen() {
        if (!this.isSelected) return
        this.canvas.onmousedown = this.start.bind(this)
        this.canvas.ontouchstart = this.start.bind(this)
        this.canvas.onmousemove = this.move.bind(this)
        this.canvas.ontouchmove = this.move.bind(this)
        this.canvas.onmouseup = this.stop.bind(this)
        this.canvas.ontouchend = this.stop.bind(this)
        this.canvas.onmouseleave = this.stop.bind(this)
        this.canvas.ontouchcancel = this.stop.bind(this)
    }

    start(e: MouseEvent | TouchEvent) {
        this.isMouseDown = true
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.color
        if (e instanceof MouseEvent) {
            this.ctx.moveTo(e.pageX - (e.target as any).offsetLeft, e.pageY - (e.target as any).offsetTop)
        }
        if (e instanceof TouchEvent) {
            this.ctx.moveTo(e.changedTouches[0].pageX - (e.target as any).offsetLeft, e.changedTouches[0].pageY - (e.target as any).offsetTop)
        }
    }

    move(e: MouseEvent | TouchEvent) {
        if (!this.isMouseDown) return
        if (e instanceof MouseEvent) {
            this.draw(e.pageX - (e.target as any).offsetLeft, e.pageY - (e.target as any).offsetTop)
        }
        if (e instanceof TouchEvent) {
            this.draw(e.changedTouches[0].pageX - (e.target as any).offsetLeft, e.changedTouches[0].pageY - (e.target as any).offsetTop)
        }
    }

    stop() {
        this.isMouseDown = false
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}