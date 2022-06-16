<template>
  <div class="draw-wrap d-flex position-fixed">
    <div class="canvas-wrap" ref="canvasWrap" :style="{width: '640px', height: '920px'}">
      <canvas id="canvas" ref="canvas"></canvas>
      <!--      <div class="scale-buttons">-->
      <!--        <img :src="MagnifierMinus" class="mr-2" @click="sheet.decreaseCanvasScale"/>-->
      <!--        <img :src="MagnifierPlus" @click="sheet.increaseCanvasScale"/>-->
      <!--      </div>-->
      <textarea v-show="sheet.text.isOpenInput"
                class="text-input"
                ref="textInput"
                autofocus
                :style="{left: sheet.text.x + 'px', top: sheet.text.y + 'px', color: sheet.text.color, borderColor: sheet.text.color}"
                v-model="sheet.text.text"
      />
    </div>

    <div class="toolbar flex-grow-1 ml-8">

      <div class="tool-wrap d-flex align-center">
        <div class="tool-icon circle mr-3" @click="selectCircle" :class="{selected: sheet.circle.isSelected}"></div>
        <input v-model="sheet.circle.color" class="color-input" type="color">
      </div>

      <div class="tool-wrap mt-4">
        <div class="tool-icon rectangle"></div>
      </div>

      <div class="tool-wrap mt-4 position-relative d-flex align-center">
        <div class="tool-icon pen mr-3" @click="selectPen" :class="{selected: sheet.pen.isSelected}">
          <v-icon color="white">mdi-pen</v-icon>
        </div>
        <input v-model="sheet.pen.color" class="color-input" type="color">
      </div>

      <div class="tool-wrap mt-4">
        <div class="tool-icon text mr-3" @click="selectText" :class="{selected: sheet.text.isSelected}">
          <v-icon color="white">mdi-text-shadow</v-icon>
        </div>
        <input v-model="sheet.text.color" class="color-input" type="color">
      </div>

      <div class="tool-wrap mt-4 d-flex">
        <v-btn @click="undo" :disabled="!sheet.undoList.length" icon="mdi-arrow-left" class="mr-3"></v-btn>
        <v-btn @click="redo" :disabled="!sheet.redoList.length" icon="mdi-arrow-right"></v-btn>
      </div>

      <textarea v-model="comment" class="mt-4 comment-input"></textarea>
      <button class="insert mt-3" @click="acceptChanges">INSERT</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, onMounted, reactive, ref} from "vue";
import {Sheet} from "./models/Sheet";
import MagnifierPlus from "./../../assets/icons/magnifier-plus.svg"
import MagnifierMinus from "./../../assets/icons/magnifier-minus.svg"
import {watch} from "vue";

interface IProps {
  img: string
}

const props = withDefaults(defineProps<IProps>(), {})

const emits = defineEmits<{
  (e: "acceptChanges", data: { comment: string, dataUrl: string }): void
}>()

const canvas = ref<HTMLCanvasElement>(null)
const canvasWrap = ref(null)
const textInput = ref(null)
const comment = ref("")
const sheet = reactive<Sheet>(new Sheet(canvas.value))

onMounted(() => {
  const image = new Image()
  image.src = props.img
  image.onload = () => {
    sheet.init(canvas.value, canvasWrap.value.getBoundingClientRect().width, canvasWrap.value.getBoundingClientRect().height)
    sheet.setImage(image)
  }
  document.addEventListener('mousedown', (e: any) => {
    if ((e.target.contains(canvas.value) || sheet.text.text) && sheet.isHasSelectedTool) {
      sheet.saveCanvasState()
    }
  })
})

const selectPen = () => {
  sheet.selectTool('pen')
}

const selectCircle = () => {
  sheet.selectTool('circle')
}

const selectText = () => {
  sheet.selectTool('text')
}

const undo = () => {
  sheet.undo()
}

const redo = () => {
  sheet.redo()
}

watch(() => sheet.text.isOpenInput, () => {
  if (sheet.text.isOpenInput) {
    textInput.value.focus()
  }
})

const acceptChanges = () => {
  emits('acceptChanges', {comment: comment.value, dataUrl: sheet.result})
}
</script>

<style lang="scss" scoped>
.draw-wrap {
  height: 100%;
  position: absolute;
  left: 0;
  top: 30px;
  background-color: white;
}

.canvas-wrap {
  border: 1px solid black;
  max-width: 550px;
  max-height: 600px;
  overflow: hidden;
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-input {
    position: fixed;
    border: 1px dashed black;
  }

  .scale-buttons {
    left: 10px;
    bottom: 10px;
    height: 25px;
    display: flex;
    position: absolute;

    img {
      opacity: 0.5;
      cursor: pointer;
      transition: all 0.1s linear;

      &:hover {
        opacity: 1;
      }

      &:active {
        transform: scale(0.8);
      }
    }
  }
}

.tool-wrap {
  display: flex;

  .tool-icon {
    border-radius: 50%;
    background-color: #312f30;
    width: 41px;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0px 0px 7px 1px #312f30;
    cursor: pointer;

    &:after {
      content: '';
      display: block;
      position: absolute;
    }
  }

  .selected {
    border: 1px solid yellow;
  }

  .circle::after {
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: 2px solid white;
  }

  .rectangle::after {
    width: 21px;
    height: 21px;
    border: 2px solid white;
  }

  .text::after {
    display: none;
  }

  .color-input {
    border: 4px solid black;
    width: 40px;
    height: 40px;
    padding: 1px 2px;
  }
}

.comment-input {
  border: 1px solid #312f30;
  border-radius: 4px;
  max-height: 200px !important;
  max-width: 400px;
  width: 100%;
  padding: 15px;
}

.insert {
  background-color: #312f30;
  padding: 10px 20px;
  color: white;
  border-radius: 4px;
}
</style>