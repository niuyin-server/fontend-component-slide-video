<script setup>
import {ref, reactive, onMounted} from "vue";
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

onMounted(() => {
  console.log("index" + props.index + " activeIndex" + props.activeIndex)
})
</script>

<template>
  <div class="slide-video-box relative">
    <div v-if="index === activeIndex" class="slide-video-box--video">
      <video-player :video="video" :autoplay="false"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide-video-box {
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

.video-cover {
  filter: blur(60px);
  opacity: 0.8;
  user-select: none;
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

/*控制器样式*/
:deep(.plyr--video .plyr__controls>.plyr__control) {
  border-radius: 50%;
}

//:deep(.plyr--video .plyr__controls>.plyr__control:hover) {
//  background: rgba(62, 128, 248, 0.3);
//}

:deep(.plyr--video .plyr__controls .plyr__controls__item>.plyr__control) {
  border-radius: 50%;
}

//:deep(.plyr--video .plyr__controls .plyr__controls__item>.plyr__control:hover) {
//  background: rgba(62, 128, 248, 0.3);
//}

:deep(.plyr__control--overlaid) {
  background: rgba(62, 99, 248, 0.4);
  backdrop-filter: blur(1rem);
}

</style>
