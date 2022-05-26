export class ImageModel {
    type: string = "image"
    x: number = 0.5
    y: number = 0.5
    width: number = 1
    height: number = 1
    relative= true
    src: string = ""

    constructor(obj?: Partial<ImageModel>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}
