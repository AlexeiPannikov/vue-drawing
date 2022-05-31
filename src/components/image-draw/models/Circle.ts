import {Tool} from "./Tool";

export class Circle extends Tool {

    isMouseDown: boolean = false
    private startX: number = null
    private startY: number = null
    private saved: any = null

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
            this.startX = e.pageX - (e.target as any).offsetLeft
            this.startY = e.pageY - (e.target as any).offsetTop
        }
        if (e instanceof TouchEvent) {
            this.startX = e.changedTouches[0].pageX - (e.target as any).offsetLeft
            this.startY = e.changedTouches[0].pageY - (e.target as any).offsetTop
        }
        this.saved = this.canvas.toDataURL()
    }

    move(e: MouseEvent | TouchEvent) {
        if (!this.isMouseDown) return
        let radius
        if (e instanceof MouseEvent) {
            radius = e.pageX - (e.target as any).offsetLeft - this.startX
        }
        if (e instanceof TouchEvent) {
            radius = e.changedTouches[0].pageX - (e.target as any).offsetLeft - this.startX
        }
        if (radius <= 0) {
            radius = Math.abs(radius)
        }
        this.draw(this.startX, this.startY, radius)
    }

    stop() {
        this.isMouseDown = false
    }

    draw(x: number, y: number, r: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2 * Math.PI, false)
            this.ctx.stroke()
        }
    }
}