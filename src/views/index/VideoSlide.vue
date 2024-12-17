<script setup>
import {onMounted, ref} from 'vue';
import Slide from '@/components/Slide.vue';
import {recommendVideoFeed} from "@/api/recommend.js";
import SlideChoose from "@/components/SlideChoose.vue";
import Behave from "@/components/Behave.vue";

const videoList = ref([])

const loadVideo = async () => {
  const res = await recommendVideoFeed()
  if (res.data.code !== 200) return
  // console.log(res.data)
  videoList.value = [...videoList.value, ...res.data.data]
  console.log(videoList.value)
}

function refresh() {
  console.log("表示上拉刷新");
}

function toBottom() {
  console.log("表示已到底部");
}

function load() {
  console.log("表示加载预加载下一个");
  loadVideo()
}

onMounted(() => {
  loadVideo()
})
</script>

<template>
  <div class="main-container h-full flex">
    <Slide
        :list="videoList"
        v-slot="{ item, index, activeIndex }"
        @refresh="refresh"
        @toBottom="toBottom"
        @load="load">
      <SlideChoose :item="item"
                   :index="index"
                   :activeIndex="activeIndex"
                   :publish-type="item.publishType"/>
      <Behave :item="item"
              :index="index"
              :activeIndex="activeIndex"/>
    </Slide>
  </div>
</template>

<style scoped>
.main-container {
  border-radius: 1rem;
  overflow: hidden;
}
</style>
