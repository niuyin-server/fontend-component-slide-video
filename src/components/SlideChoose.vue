<script setup>
import SlideImage from "@/components/SlideImage.vue";
import SlideVideo from "@/components/SlideVideo.vue";

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
  <slide-video v-if="publishType==='0'"
               :video="item"
               :index="index"
               :activeIndex="activeIndex"
               autoplay/>
  <SlideImage v-else-if="publishType==='1'"
              :image-list="item.imageList"/>
  <div v-else> fail</div>
</template>

<style scoped>

</style>
