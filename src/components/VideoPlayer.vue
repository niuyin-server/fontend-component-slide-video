<script setup>
import {ref, reactive} from "vue";
import videoPlay from "vue3-video-play/lib/index";

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
  width: "100%",
  height: "100%",
  color: "#409eff",
  title: props.video.title,
  src: props.video.videoUrl,
  poster: props.video.coverImage,
  muted: false,
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"],
  autoPlay: props.autoplay,
  loop: false,
  mirror: false,
  ligthOff: false,
  volume: 0.5,
  control: true,
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ],
});
</script>

<template>
  <videoPlay v-bind="options"/>
</template>

<style scoped>

</style>
