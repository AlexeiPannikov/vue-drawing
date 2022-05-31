<template>
  <div class="draw-wrap d-flex">
    <div class="canvas-wrap flex-grow-1" ref="canvasWrap">
      <canvas id="canvas" ref="canvas"></canvas>
    </div>

    <div class="toolbar flex-grow-0 ml-8">

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
        <div class="tool-icon text">
          <v-icon color="white">mdi-text-shadow</v-icon>
        </div>
      </div>

      <div class="tool-wrap mt-4 d-flex">
        <v-btn @click="undo" :disabled="!sheet.undoList.length" icon="mdi-arrow-left" class="mr-3"></v-btn>
        <v-btn @click="redo" :disabled="!sheet.redoList.length" icon="mdi-arrow-right"></v-btn>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {Sheet} from "./models/Sheet";
import Shirt from "./../../assets/shirt.png"

const canvasWrap = ref(null)
const canvas = ref<HTMLCanvasElement>(null)

const sheet = reactive<Sheet>(new Sheet(canvas.value))

const setCanvasSize = () => {
  canvas.value.width = canvasWrap.value.getBoundingClientRect().width
  canvas.value.height = canvasWrap.value.getBoundingClientRect().height
}

onMounted(() => {
  setCanvasSize()
  sheet.initTools(canvas.value)
  const img = new Image(canvas.value.width, canvas.value.height)
  img.src = Shirt
  img.onload = () => {
    sheet.setImage(img)
  }
  window.addEventListener('resize', () => {
    setCanvasSize();
  })
  document.addEventListener('mousedown', (e: any) => {
    if (e.target.contains(canvas.value)) {
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

const undo = () => {
  sheet.undo()
}

const redo = () => {
  sheet.redo()
}
</script>

<style lang="scss" scoped>
.draw-wrap {
  max-height: 600px;
  height: 100%;
}

.canvas-wrap {
  border: 1px solid black;
  max-width: 550px;
  max-height: 600px;
  height: 100%;
  width: 100%;
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
</style>