<script setup>
import {ref, reactive} from "vue";
import videoPlay from "vue3-video-play/lib/index";
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

// const options = reactive({
//   width: "100%",
//   height: "100%",
//   color: "#409eff",
//   title: props.video.title,
//   src: props.video.videoUrl,
//   poster: props.video.coverImage,
//   muted: false,
//   webFullScreen: false,
//   speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"],
//   autoPlay: props.autoplay,
//   loop: false,
//   mirror: false,
//   ligthOff: false,
//   volume: 0.5,
//   control: true,
//   controlBtns: [
//     "audioTrack",
//     "quality",
//     "speedRate",
//     "volume",
//     "setting",
//     "pip",
//     "pageFullScreen",
//     "fullScreen",
//   ],
// });
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
    'play-large',
    // 'restart',
    // 'rewind',
    'play',
    // 'fast-forward',
    'progress',
    'current-time',
    'duration',
    'mute',
    'volume',
    'captions',
    'settings',
    'pip',
    'airplay',
    // 'download',
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

:deep(.plyr--video) {
  background: transparent !important;
}

:deep(.plyr--video .plyr__video-wrapper) {
  background: transparent !important;
}

:deep(.plyr__poster) {
  background-color: transparent !important;
}
</style>
