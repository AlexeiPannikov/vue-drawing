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
        this.startX = e.pageX - (e.target as any).offsetLeft
        this.startY = e.pageY - (e.target as any).offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.isMouseDown) {
            let radius = e.pageX - this.startX
            if (radius <= 0) {
                radius = Math.abs(radius)
            }
            this.draw(this.startX, this.startY, radius)
        }
    }

    mouseUpHandler(e: MouseEvent) {
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