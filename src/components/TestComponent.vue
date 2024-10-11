<!-- src/components/TestComponent.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <h1>Test Component</h1>
    <button @click="count++">Count is: {{ count }}</button>
  </div>
</template>