import {Pen} from "./Pen";
import {Circle} from "./Circle";

export class Sheet {

    canvas: HTMLCanvasElement = null
    pen: Pen = null
    circle: Circle = null
    undoList: string[] = []
    redoList: string[] = []

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.circle = new Circle(canvas)
        this.pen = new Pen(canvas)
    }

    initTools(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.circle = new Circle(canvas)
        this.pen = new Pen(canvas)
    }

    get selectedToolName() {
        let name = ""
        Object.entries(this).forEach(([key, value]) => {
            if (value?.isSelected) {
                name = key
            }
        })
        return name
    }

    setImage(img: HTMLImageElement) {
        this.canvas.getContext('2d').drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    }

    selectTool(toolName: string) {
        this.pen.destroyEvents()
        this.circle.destroyEvents()
        Object.entries(this).forEach(([key, value]) => {
            if (toolName !== key) {
                value.isSelected = false
            } else {
                value.isSelected = true
                value.listen()
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