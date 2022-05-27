<template>
  <div class="draw-wrap d-flex">
    <div class="canvas-wrap flex-grow-1" ref="canvasWrap">
      <canvas id="canvas" ref="canvas"></canvas>
    </div>

    <div class="toolbar flex-grow-0 ml-8">

      <div class="tool-wrap">
        <div class="tool-icon circle" @click="selectCircle" :class="{selected: isSelectedCircle}"></div>
        <div class="color-box" :style="{backgroundColor: circleColor}"
             @click="isOpenCircleColorPicker = true" v-click-outside="() => {isOpenCircleColorPicker = false}">
          <div class="color-picker-wrap position-absolute" v-show="isOpenCircleColorPicker">
            <v-color-picker v-model="circleColor" mode="hex"></v-color-picker>
          </div>
        </div>
      </div>

      <div class="tool-wrap mt-4">
        <div class="tool-icon rectangle"></div>
      </div>

      <div class="tool-wrap mt-4 position-relative">
        <div class="tool-icon pen" @click="selectPen" :class="{selected: isSelectedPen}">
          <v-icon color="white">mdi-pen</v-icon>
        </div>
        <div class="color-box" :style="{backgroundColor: penColor}"
             @click="isOpenPenColorPicker = true" v-click-outside="() => {isOpenPenColorPicker = false}">
          <div class="color-picker-wrap position-absolute" v-show="isOpenPenColorPicker">
            <v-color-picker v-model="penColor" mode="hex"></v-color-picker>
          </div>
        </div>
      </div>

      <div class="tool-wrap mt-4">
        <div class="tool-icon text">
          <v-icon color="white">mdi-text-shadow</v-icon>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

import {computed, onMounted, reactive, ref, watch} from "vue";
import {CanvasModel} from "./models/CanvasModel";
import Shirt from "./../../assets/shirt.png"

const canvasWrap = ref(null)
const canvas = ref<HTMLCanvasElement>(null)

const isOpenPenColorPicker = ref(false)
const isOpenCircleColorPicker = ref(false)

let sheet = reactive<CanvasModel>(new CanvasModel(canvas.value))

const setCanvasSize = () => {
  sheet.setCanvasSize(canvasWrap.value.getBoundingClientRect().width, canvasWrap.value.getBoundingClientRect().height)
}


onMounted(() => {
  canvas.value.style.display = "block"
  sheet = reactive(new CanvasModel(canvas.value))

  setCanvasSize()
  sheet.setImage(Shirt)

  window.addEventListener('resize', () => {
    setCanvasSize();
  })

  canvas.value.addEventListener('mousedown', (e) => {
    sheet.start(e)
  })
  canvas.value.addEventListener('touchstart', (e) => {
    sheet.start(e)
  })
  canvas.value.addEventListener('mousemove', (e) => {
    sheet.draw(e)
  })
  canvas.value.addEventListener('touchmove', (e) => {
    sheet.draw(e)
  })

  document.addEventListener('mouseup', (e) => sheet.stop(e))
  document.addEventListener('touchend', (e) => sheet.stop(e))
  canvas.value.addEventListener('mouseout', (e) => sheet.stop(e))
})

const selectPen = () => {
  sheet.selectTool('pen')
  isSelectedPen.value = sheet.tools.pen.isSelected
}

const selectCircle = () => {
  sheet.selectTool('circle')
  isSelectedCircle.value = sheet.tools.circle.isSelected
}

const isSelectedPen = ref(false)
const isSelectedCircle = ref(false)

const penColor = ref(sheet?.tools.pen.color)
const circleColor = ref(sheet?.tools.circle.color)

watch(penColor, () => {
  sheet.tools.pen.color = penColor.value
})

watch(circleColor, () => {
  sheet.tools.circle.shape.stroke.fill = circleColor.value
})
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

  .color-box {
    position: relative;
    width: 41px;
    height: 41px;
    margin-left: 16px;
    border-radius: 4px;
    border: 5px solid #312f30;
    box-shadow: 0px 0px 7px 1px #312f30;
    cursor: pointer;
  }

  .color-picker-wrap {
    left: 60px;
    z-index: 100;
  }
}
</style>