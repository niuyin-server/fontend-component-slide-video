<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  },
  index: {
    type: Number,
    default: 0
  },
  activeIndex: {
    type: Number,
    default: 0
  },
  // 发布类型：0视频1图文
  publishType: {
    type: String,
    default: '0'
  }
})
</script>

<template>

</template>

<style scoped>

</style>
