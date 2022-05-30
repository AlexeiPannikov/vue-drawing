export class Tool {

    canvas: HTMLCanvasElement = null
    ctx: CanvasRenderingContext2D = null
    isSelected: boolean = false
    color: string = "#ff0000"

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas?.getContext('2d')
    }

    destroyEvents() {
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null
        this.canvas.onmouseup = null
        this.canvas.onmouseleave = null
    }
}