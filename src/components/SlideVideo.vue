<script setup>
import {ref, reactive} from "vue";
import videoPlay from "vue3-video-play/lib/index";
import Video from "@/components/Video.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";

const props = defineProps({
  video: {
    type: Object,
    default: () => {
      return {}
    }
  },
  index: {type: Number, default: 0},
  activeIndex: {type: Number, default: 0},
  autoplay: {type: Boolean, default: false},
})
</script>

<template>
  <div class="item-box relative">
<!--    <div class="item-box&#45;&#45;video"  >-->
<!--        <video-player :video="video" v-if="index === activeIndex" :autoplay="false"/>-->
<!--    </div>-->
        <video
            v-if="index === activeIndex"
            id="td-video"
            ref="video"
            class="item-box--video"
            autoplay
            mediatype="video" >
          <source :src="video.videoUrl" type="video/mp4"/>
        </video>
    <img
        :src="video.coverImage"
        alt=""
        class="item-box--video"
        v-if="index === activeIndex + 1 || index === activeIndex - 1"/>
    <img :src="video.coverImage" alt="" class="item-box--blur-cover"/>
  </div>
</template>

<style scoped lang="scss">
.item-box {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &--video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
    position: absolute;
    z-index: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all .2s;
  }

  &--blur-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
    transition: all .2s;
    filter: blur(5rem);
  }

  &--play {
    position: absolute;
    width: calc(100% / 32);
    height: calc(100% / 32);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
    }

  }
}
</style>
