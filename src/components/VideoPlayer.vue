<script setup>
import {ref, reactive} from "vue";
import Video from "@/components/Video.vue";

const props = defineProps({
  video: {
    type: Object,
    default: () => {
      return {}
    }
  },
  autoplay: {type: Boolean, default: false},
})

const options = reactive({
  i18n: {
    speed: '速度',
    normal: '正常',
    quality: '清晰度',
    qualityBadge: {
      2160: '4K',
      1440: 'HD',
      1080: 'HD',
      720: 'HD',
      576: 'SD',
      480: 'SD',
    },
  },
  controls: [
    // 'restart',
    // 'rewind',
    // 'fast-forward',
    // 'download',
    'play',
    'progress',
    'current-time',
    'duration',
    'play-large',
    'mute',
    'volume',
    'captions',
    'settings',
    'pip',
    'airplay',
    'fullscreen',
  ],
  settings: ['captions', 'quality', 'speed', 'loop'],
  speed: {
    selected: 1.0,
    options: [0.75, 1.0, 1.25, 1.5, 2.0, 3.0]
  },
  quality: {
    default: 1080,
    options: [4320, 2880, 2160, 1440, 1080, 720]
  },
  seekTime: 5,
})
</script>

<template>
  <!--  https://github.com/sampotts/plyr -->
  <!--  <videoPlay v-bind="options"/>-->
  <vue-plyr :options="options">
    <video controls crossorigin playsinline :data-poster="video.coverImage">
      <source size="1080" :src="video.videoUrl" type="video/mp4"/>
      <source size="1440" :src="video.videoUrl" type="video/mp4"/>
    </video>
  </vue-plyr>
  <img :src="video.coverImage" alt="" class="slide-video-box--blur-cover"/>
</template>

<style scoped lang="scss">
.slide-video-box--blur-cover {
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
  filter: blur(2rem);
}

</style>
