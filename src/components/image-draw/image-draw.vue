<template>
  <div class="draw-wrap w-100 h-100 d-flex">
    <div class="canvas-wrap flex-grow-1" ref="canvasWrap">
      <canvas id="canvas" ref="canvas"></canvas>
    </div>

    <div class="toolbar flex-grow-0 ml-4">

      <div class="tool-wrap">
        <div class="tool-icon circle"></div>
      </div>

      <div class="tool-wrap mt-4">
        <div class="tool-icon rectangle"></div>
      </div>

      <div class="tool-wrap mt-4 position-relative">
        <div class="tool-icon pen" @click="sheet.selectTool('pen')" :class="{selected: sheet?.tools.pen.isSelected}">
          <v-icon color="white">mdi-pen</v-icon>
        </div>
        <div class="color-box" :style="{backgroundColor: sheet?.tools.pen.color}"
             @click="isOpenLineColorPicker = true" v-click-outside="() => {isOpenLineColorPicker = false}">
          <div class="color-picker-wrap position-absolute" v-show="isOpenLineColorPicker">
<!--            <v-color-picker v-model="sheet.tools.pen.color" mode="hex"></v-color-picker>-->
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

import {onMounted, reactive, ref} from "vue";
import {CanvasModel} from "./models/CanvasModel";

const canvasWrap = ref(null)
const canvas = ref<HTMLCanvasElement>(null)
const isOpenLineColorPicker = ref(false)

let sheet = reactive<CanvasModel>(new CanvasModel(canvas.value))

onMounted(() => {
  canvas.value.style.display = "block"
  canvas.value.style.width = `${canvasWrap.value.getBoundingClientRect().width}px`
  canvas.value.style.height = `${canvasWrap.value.getBoundingClientRect().height}px`
  sheet = reactive(new CanvasModel(canvas.value))
  sheet.easyC.draw();
  canvas.value.addEventListener('mousedown', () => {sheet.start()})
})
</script>

<style lang="scss" scoped>
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