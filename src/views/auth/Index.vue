<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';

const value1 = ref(0)

onMounted(() => {
  console.log('mounted')
})

</script>

<template>
  <div>
    <el-slider v-model="value1" :show-tooltip="false"/>
  </div>
  <div class="mt-14">
  </div>
</template>

<style scoped>

</style>
