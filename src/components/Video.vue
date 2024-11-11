<template>
  <div class="item-box" @click="togglePlay">
    <video
        v-if="index === activeIndex"
        id="td-video"
        ref="video"
        class="item-box--video flex justify-center items-center"
        playsinline="true"
        webkit-playsinline="true"
        mediatype="video"
        @progress="progress"
        @durationchange="durationchange"
        @loadeddata="loadeddata"
        @playing="playing"
        @waiting="waiting"
        @timeupdate="timeupdate"
        @canplay="playing"
        @ended="ended">
      <source :src="src" type="video/mp4"/>
    </video>
    <img
        :src="poster"
        alt=""
        class="item-box--video"
        v-if="index === activeIndex + 1 || index === activeIndex - 1 || showImg"/>
    <img :src="poster" alt="" class="item-box--blur-cover"/>
    <slot></slot>
    <div class="item-box--play flex justify-center items-center" v-if="paused">
      <img src="@/assets/icon_4.png" alt=""/>
    </div>
    <div class="template-loading" v-if="loading"></div>
    <div class="item-box__progress" @click.stop="">
      <div class="progress-time" style="display: none">
        <span class="start">{{ hoverTime }}</span>/<span class="end">{{ endTime }}</span>
      </div>
      <div class="progress"
           ref="progressRef"
           @click="handleProgress">
        <div class="progress-buffer"
             :style="`width:${percentageBuffer}%`"></div>
        <div class="progress-read"
             :style="`width:calc(${percentage}% + 6px)`"></div>
        <div ref="progressSpeed"
             class="progress-speed"
             @touchstart="touchstart"
             @touchend="touchend"
             @touchmove="touchmove"
             :style="`left:${percentage}%`"
             @click.stop="">
          <div class="progress-speed--btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {second} from '@/utils';

const props = defineProps({
  poster: {type: String, default: ''},
  src: {type: String, default: ''},
  index: {type: Number, default: 0},
  activeIndex: {type: Number, default: 0},
  autoplay: {type: Boolean, default: false},
});

const paused = ref(true);
const endTime = ref(second(0));
const startTime = ref(second(0));
const isDragging = ref(false);
const percentageBuffer = ref(0);
const percentage = ref(0);
const video = ref(null);
const showImg = ref(true);
const loading = ref(false);
const progressRef = ref(null);
const hoverTime = ref('');

function play() {
  video.value.play();
  paused.value = false;
}

function pause() {
  if (paused.value) return;
  video.value.pause();
  paused.value = true;
  loading.value = false;
}

function togglePlay() {
  if (paused.value) play();
  else pause();
}

function progress() {
  if (!video.value) return;
  percentageBuffer.value = Math.floor((video.value.buffered.length ? video.value.buffered.end(video.value.buffered.length - 1) / video.value.duration : 0) * 100);
}

function durationchange() {
  endTime.value = second(video.value.duration);
}

function loadeddata() {
  showImg.value = false;
  props.autoplay && play();
}

function playing() {
  loading.value = false;
}

function waiting() {
  loading.value = true;
}

function timeupdate() {
  if (isDragging.value || !video.value) return;
  startTime.value = second(Math.floor(video.value.currentTime));
  percentage.value = Math.floor((video.value.currentTime / video.value.duration) * 100);
  hoverTime.value = second(Math.floor(video.value.currentTime));
}

function touchstart() {
  isDragging.value = true;
}

function touchend(e) {
  isDragging.value = false;
  const width = progressRef.value.offsetWidth;
  const tx = e.layerX;
  video.value.currentTime = video.value.duration * (tx / width);
  timeupdate(); // 更新进度条位置
}

function touchmove(e) {
  const width = progressRef.value.offsetWidth;
  const tx = e.layerX;
  if (tx < 0 || tx > width) return;
  percentage.value = Math.floor((tx / width) * 100);
  hoverTime.value = second(Math.floor(video.value.duration * (tx / width)));
}

function handleProgress(e) {
  touchstart();
  touchmove(e);
  touchend(e);
}

function ended() {
  play();
}

onMounted(() => {
  // 初始化操作
});
</script>

<style lang="scss">
.item-box {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #000000;
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

  .template-loading {
    position: absolute;
    left: 50%;
    margin-left: -36px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 28px 0 0 #ff552e, 50px 0 0 #3e80f8, 72px 0 0 #53e7ae,
    94px 0 0 #ffce5a;
    animation: spinner-dot 1.2s infinite linear;
    transform: translateX(-28px);
    top: 50%;
    margin-top: -5;
  }

  &__progress {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 64px;
    background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 100%
    );

    &:hover {
      .progress {
        height: 10px !important;

        &-time {
          display: block !important;
        }

        &-buffer {
          height: 10px;
        }

        &-read {
          height: 10px;
        }

        &-speed--btn {
          width: 12px;
          height: 12px;
        }
      }

      &::before {
        transition: all .2s;
        height: 10px;
      }

    }

    .progress-time {
      padding: .25rem 1rem;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 1rem;
      position: absolute;
      left: 50%;
      bottom: 32px;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, .8);
      transition: height .2s;

      .start {
        font-size: 12px;
        font-weight: 600;
        line-height: 1.5;
        display: inline-block;
        padding-right: 3px;
      }

      .end {
        font-size: 12px;
        font-weight: 600;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.5);
        display: inline-block;
        padding-left: 3px;
      }
    }

    .progress {
      position: absolute;
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.1);
      bottom: 0;
      left: 0;
      transition: all .2s;

      &-buffer {
        position: absolute;
        left: 0;
        top: 0;
        height: 5px;
        background: rgba(255, 255, 255, 0.8);
        transition: all .5s;
      }

      &-read {
        position: absolute;
        left: 0;
        top: 0;
        height: 5px;
        background: rgb(255, 255, 255);
        transition: all .1s;
      }

      &-speed {
        position: absolute;
        left: 0;
        top: 0;
        width: 32px;
        height: 32px;
        margin-left: -15px;
        margin-top: -15px;

        &--btn {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 8px;
          height: 8px;
          margin-top: -2px;
          background: rgba(255, 255, 255, .6);
          border-radius: 50%;
          transition: all .2s;
        }
      }
    }

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: rgba(0, 0, 0, 0.6);
      content: '';
    }
  }
}

@keyframes spinner-dot {
  20% {
    box-shadow: 28px -10px 0 #ff552e, 50px 0 0 #3e80f8, 72px 0 0 #53e7ae,
    94px 0 0 #ffce5a;
  }

  40% {
    box-shadow: 28px 0 0 #ff552e, 50px -10px 0 #3e80f8, 72px 0 0 #53e7ae,
    94px 0 0 #ffce5a;
  }

  60% {
    box-shadow: 28px 0 0 #ff552e, 50px 0 0 #3e80f8, 72px -10px 0 #53e7ae,
    94px 0 0 #ffce5a;
  }

  80% {
    box-shadow: 28px 0 0 #ff552e, 50px 0 0 #3e80f8, 72px 0 0 #53e7ae,
    94px -10px 0 #ffce5a;
  }
}
</style>
