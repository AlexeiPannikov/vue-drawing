<template>
  <div class="h-75 w-50 pt-9 ml-9">
    <div class="d-flex img-list">
      <img :src="Shirt" @click="selectImg(Shirt)" alt="">
      <img :src="WomanShirt" @click="selectImg(WomanShirt)" alt="">
      <img :src="BlueShirt" @click="selectImg(BlueShirt)" alt="">
    </div>

    <div class="mt-5">
      <p>RESULT</p>
      <img :src="returnedImg" alt="">
      <p>COMMENT</p>
      <div>{{comment}}</div>
    </div>

    <div v-if="selectedImg" style="width: 100vw; height: 100vh; top: 30px; left: 0">
      <image-draw :img="selectedImg" @accept-changes="setReturnedImage"></image-draw>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageDraw from "./components/image-draw/image-draw.vue";
import Shirt from "./assets/shirt.png"
import WomanShirt from "./assets/woman-shirt.jpg"
import BlueShirt from "./assets/blue-shirts.jpg"
import {ref} from "vue";

const selectedImg = ref<string>(null)
const returnedImg = ref<string>(null)
const comment = ref("")

const selectImg = (data: string) => {
  selectedImg.value = data
}

const setReturnedImage = (data: { comment: string, dataUrl: string }) => {
  selectedImg.value = null
  returnedImg.value = data.dataUrl
  comment.value = data.comment
}
</script>

<style lang="scss" scoped>
@import "./assets/styles/reset.css";

html, body, #app {
  height: 100%;
}

.img-list {
  img {
    cursor: pointer;
  }
}

img {
  width: 140px;
  height: 140px;
  margin-right: 20px;
  object-fit: cover;
}
</style>
