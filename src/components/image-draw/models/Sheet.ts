import {Pen} from "./Pen";
import {Circle} from "./Circle";
import {Text} from "./Text";

export class Sheet {

    canvas: HTMLCanvasElement = null
    pen: Pen = null
    circle: Circle = null
    text: Text = null
    undoList: string[] = []
    redoList: string[] = []
    canvasScale: number = 100
    private maxImgWidth: number
    private maxImgHeight: number

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.circle = new Circle(canvas)
        this.pen = new Pen(canvas)
        this.text = new Text(canvas)
    }

    get isHasSelectedTool() {
        const tools = [this.pen, this.circle, this.text]
        return tools.find(({isSelected}) => isSelected)
    }

    get result() {
        return this.canvas.toDataURL()
    }

    init(canvas: HTMLCanvasElement, w: number, h: number) {
        this.canvas = canvas
        this.initCanvasSize(w, h)
        this.circle = new Circle(this.canvas)
        this.pen = new Pen(this.canvas)
        this.text = new Text(this.canvas)
        // this.canvas.addEventListener('wheel', this.zoom.bind(this))
    }

    initCanvasSize = (w: number, h: number) => {
        this.canvas.width = w
        this.canvas.height = h
        this.maxImgWidth = w
        this.maxImgHeight = h
    }

    setCanvasSize = (w: number, h: number) => {
        this.canvas.width = w
        this.canvas.height = h
    }

    increaseCanvasScale() {
        if (this.canvasScale < 91) {
            this.canvasScale += 10

        }
    }

    decreaseCanvasScale() {
        if (this.canvasScale > 19) {
            this.canvasScale -= 10

        }
    }

    // zoom(e: WheelEvent) {
    //     e.preventDefault()
    //     if (e.deltaY > 0) {
    //         this.decreaseCanvasScale()
    //     }
    //     if (e.deltaY < 0) {
    //         this.increaseCanvasScale()
    //     }
    // }

    setImage(img: HTMLImageElement) {
        this.canvas.getContext('2d').drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        this.maxImgWidth = this.canvas.width
        this.maxImgHeight = this.canvas.height
    }

    selectTool(toolName: string) {
        this.pen.destroyEvents()
        this.circle.destroyEvents()
        const tools = [this.pen, this.circle, this.text]
        tools.forEach(item => {
            if (item.name !== toolName) {
                item.isSelected = false
            } else {
                item.isSelected = true
                item.listen()
            }
        })
    }

    saveCanvasState() {
        this.pushToUndo(this.canvas.toDataURL())
    }

    pushToUndo(data: string) {
        this.undoList.push(data)
    }

    pushToRedo(data: string) {
        this.redoList.push(data)
    }

    undo() {
        const ctx = this.canvas.getContext('2d')
        if (!this.undoList.length) return
        const dataUrl = this.undoList.pop()
        this.pushToRedo(this.canvas.toDataURL())
        const img = new Image()
        img.src = dataUrl
        img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        const ctx = this.canvas.getContext('2d')
        if (!this.redoList.length) return
        const dataUrl = this.redoList.pop()
        this.pushToUndo(this.canvas.toDataURL())
        const img = new Image()
        img.src = dataUrl
        img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
    }
}