<script setup>
import Video from '@/components/Video.vue';
import SlideImage from "@/components/SlideImage.vue";

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
  <Video v-if="publishType==='0'"
         :src="item.videoUrl"
         :poster="item.coverImage"
         :index="index"
         :activeIndex="activeIndex"
         autoplay>
  </Video>
  <SlideImage v-else-if="publishType==='1'"
              :image-list="item.imageList"/>
  <div v-else> fail </div>
</template>

<style scoped>

</style>
