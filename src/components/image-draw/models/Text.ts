import {Tool} from "./Tool";

export class Text extends Tool {

    name = "text"
    text = ""
    isOpenInput = false
    x = 0
    y = 0

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    listen() {
        if (!this.isSelected) return;
        document.onclick = this.onClickHandler.bind(this)
        document.ontouchstart = this.onClickHandler.bind(this)
    }

    onClickHandler(e: MouseEvent | TouchEvent) {
        const isHasTarget = this.canvas.parentElement.contains(e.target as HTMLElement)
        if (!isHasTarget && this.text) {
            this.printText(e)
            this.stop()
            return
        }
        if (isHasTarget && !this.text) {
            this.start(e)
            return
        }
        if (isHasTarget && this.text) {
            this.start(e)
            return
        }
        if (!isHasTarget && !this.text && this.isOpenInput) {
            this.stop()
            return
        }
    }

    start(e: MouseEvent | TouchEvent) {
        e.stopPropagation()
        if (!this.canvas.contains(e.target as HTMLElement)) return
        this.isOpenInput = true
        if (e instanceof MouseEvent) {
            this.x = e.clientX
            this.y = e.clientY
        }
        if (e instanceof TouchEvent) {
            this.x = e.changedTouches[0].clientX
            this.y = e.changedTouches[0].clientY
        }
    }

    printText(e: MouseEvent | TouchEvent) {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.font = "16px Verdana";
        this.text.split('\n').forEach((item, idx) => {
            if (idx > 0) {
                this.y += 22
            }
            const offsetX = this.canvas.getBoundingClientRect().left
            const offsetY = this.canvas.getBoundingClientRect().top
            if (e instanceof MouseEvent) {
                this.ctx.fillText(item, this.x - offsetX, this.y - offsetY + 12);

            }
            if (e instanceof TouchEvent) {
                this.ctx.fillText(item, this.x - offsetX, this.y - offsetY + 12);
            }
        })
        this.text = ""
        this.isOpenInput = false
    }

    stop() {
        this.text = ""
        this.isOpenInput = false
    }
}