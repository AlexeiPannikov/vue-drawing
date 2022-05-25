<template>
  <div class="h-75 w-50 pt-9 ml-9">
    <image-draw></image-draw>
  </div>
</template>

<script setup lang="ts">
import ImageDraw from "./components/image-draw/image-draw.vue";
</script>

<style>
@import "./assets/styles/reset.css";

html, body, #app {
  height: 100%;
}
</style>
