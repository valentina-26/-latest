<script setup>
import { defineAsyncComponent } from 'vue'
const HelloWorld = defineAsyncComponent(() => import('./components/HelloWorld.vue'))
</script>

<template>
  <div>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style scoped>
/* ... tus estilos ... */
</style>