<script setup>
import {ref, onMounted} from 'vue';
import Slide from '@/components/Slide.vue';
import Video from '@/components/Video.vue';
import {recommendVideoFeed} from "@/api/recommend.js";

const videoList = ref([])

const loadVideo = async () => {
  const res = await recommendVideoFeed()
  if (res.data.code !== 200) return
  console.log(res.data)
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

function fabulous() {
  console.log("这是点赞");
}

function comment() {
  console.log("这是评论");
}

function collection() {
  console.log("这是收藏");
}

function share() {
  console.log("这是分享");
}

onMounted(() => {
  loadVideo()
})
</script>

<template>
  <div class="main-container h-full">
    <Slide
        :list="videoList"
        v-slot="{ item, index, activeIndex }"
        @refresh="refresh"
        @toBottom="toBottom"
        @load="load"
    >
      <Video
          :src="item.videoUrl"
          :poster="item.coverImage"
          :index="index"
          :activeIndex="activeIndex"
          autoplay
      >
        <div class="mantle">
          <div class="right" @click.stop="">
            <div class="right-btn fabulous" @click="fabulous">点赞</div>
            <div class="right-btn comment" @click="comment">评论</div>
            <div class="right-btn collection" @click="collection">收藏</div>
            <div class="right-btn share" @click="share">分享</div>
          </div>
        </div>
      </Video>
    </Slide>
  </div>
</template>

<style scoped>
.main-container {
  border-radius: 1rem;
  overflow: hidden;
}
</style>
