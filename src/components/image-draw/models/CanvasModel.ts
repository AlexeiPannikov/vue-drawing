import {Shape} from "./Shape";
import {PenTool} from "./PenTool";
import {Tools} from "./Tools";
import {ImageModel} from "./ImageModel";
// @ts-ignore
import {EasyC} from "./../easyc"
import {CircleTool} from "./CircleTool";

export class CanvasModel {
    canvas: HTMLCanvasElement = null
    ctx: CanvasRenderingContext2D = null
    tools: Tools = null
    // @ts-ignore
    easyC: EasyC = null

    private restore: ImageData[] = []

    get selectedTool() {
        const rez = Object.entries(this.tools).find(([, value]) => value.isSelected)
        if (rez) return rez[1]
    }

    selectTool(toolName: string) {
        for (let key in this.tools) {
            (this.tools as any)[key].isSelected = (this.tools as any)[key].name === toolName
        }
    }

    setImage(src: string) {
        this.easyC.objects.push(new ImageModel({src}))
        this.easyC.draw()
    }

    setCanvasSize(width: number, height: number) {
        this.canvas.width = width
        this.canvas.height = height
        this.easyC.draw()
    }

    start(e: MouseEvent | TouchEvent) {
        if (this.selectedTool instanceof PenTool) {
            this.selectedTool.start(e)
        }
        if (this.selectedTool instanceof CircleTool) {
            this.easyC.objects.push(this.selectedTool.shape)
            this.selectedTool.start(e)
            console.log(this.easyC.objects)
        }
        this.easyC.draw()
    }

    draw(e: MouseEvent | TouchEvent) {
        if (this.selectedTool instanceof PenTool) {
            this.selectedTool.draw(e)
        }
        if (this.selectedTool instanceof CircleTool) {
            const isSuccess = this.selectedTool.draw(e)
            if (isSuccess) {
                this.easyC.draw()
            }
        }
    }

    stop(e: MouseEvent | TouchEvent) {
        if (this.selectedTool instanceof PenTool) {
            this.selectedTool.stop()
        }
        if (this.selectedTool instanceof CircleTool) {
            if (this.selectedTool.isDrawing) {
                this.easyC.objects.push(JSON.parse(JSON.stringify(this.easyC.objects.splice(-1, 1)[0])))
            }
            if (this.easyC.objects[this.easyC.objects.length - 1].radius <= 0) {
                this.easyC.objects.pop()
            }
            this.selectedTool.stop()
        }
        if ((e as Event).type !== 'mouseout' && this.selectedTool && this.canvas.contains((e as any).target)) {
            this.saveInRestore()
        }
    }

    saveInRestore() {
        this.restore.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height))
    }

    addShape(shape: Shape) {
        this.easyC.objects.push(shape)
    }

    deleteShape(idx: number) {
        this.easyC.objects.splice(idx, 1)
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas?.getContext('2d')
        this.tools = new Tools(canvas, this.ctx)
        // @ts-ignore
        this.easyC = new EasyC(canvas)
        this.easyC.draw()
    }
}