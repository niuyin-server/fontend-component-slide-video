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
    <!--    <div v-if="index === activeIndex" class="slide-video-box&#45;&#45;video">-->
    <!--      <div class="relative w-full h-full">-->
    <!--        <div class="absolute w-full h-full" style="background-color: black">-->
    <!--          <img v-if="video.coverImage" class="video-cover w-full h-full" :src="video.coverImage" alt=""/>-->
    <!--        </div>-->
    <!--        <video-player :video="video" :autoplay="false"/>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--            <video-->
    <!--                v-if="index === activeIndex"-->
    <!--                id="td-video"-->
    <!--                ref="video"-->
    <!--                class="slide-video-box&#45;&#45;video"-->
    <!--                autoplay-->
    <!--                controls-->
    <!--                mediatype="video" >-->
    <!--              <source :src="video.videoUrl" type="video/mp4"/>-->
    <!--            </video>-->
<!--    <vue-plyr v-if="index === activeIndex" :options="options" class="slide-video-box&#45;&#45;video">-->
<!--      <video controls crossorigin playsinline data-poster="poster.jpg">-->
<!--        <source size="1080" :src="video.videoUrl" type="video/mp4"/>-->
<!--      </video>-->
<!--    </vue-plyr>-->
    <div v-if="index === activeIndex" class="slide-video-box--video">
      <video-player :video="video" :autoplay="false"/>
    </div>
    <!--    <img-->
    <!--        :src="video.coverImage"-->
    <!--        alt=""-->
    <!--        class="slide-video-box&#45;&#45;video"-->
    <!--        v-if="index === activeIndex + 1 || index === activeIndex - 1"/>-->

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

</style>
