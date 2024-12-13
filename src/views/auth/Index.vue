<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import Slider from "@/components/Slider.vue";

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
    <Slider v-model="value1" :min="0" :max="100" :step="1" :vertical="false" :show-stops="true" :show-tooltip="false"/>
    <p>Current Value: {{ value1 }}</p>
  </div>
</template>

<style scoped>

</style>
