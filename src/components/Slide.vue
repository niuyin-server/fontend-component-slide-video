<script setup>
import {ref, onMounted} from "vue";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/vue';
import 'swiper/css';
import {Mousewheel} from 'swiper/modules';
import {ChevronUp, ChevronDown} from "lucide-vue-next";

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
})

const modules = ref([Mousewheel])
const activeIndex = ref(0);
const swiperDirection = ref('vertical');
// const swiperIns = useSwiper();

const emits = defineEmits(['refresh', 'toBottom', 'load']);

const transitionStart = (swiper) => {
  console.log(activeIndex.value)
  console.log(swiper.activeIndex)
  //表示没有滑动,不做处理
  if (activeIndex.value === swiper.activeIndex) {
    // 表示是第一个轮播图
    if (swiper.swipeDirection === "prev" && swiper.activeIndex === 0) {
      emits("refresh");
    } else if (
        swiper.swipeDirection === "next" && swiper.activeIndex === props.list.length - 1
    ) {
      emits("toBottom");
    }
  } else {
    activeIndex.value = swiper.activeIndex;
    // 为了预加载视频，提前load 数据
    if (swiper.activeIndex === props.list.length - 1) {
      emits("load");
    }
  }
  console.log(activeIndex.value)
  console.log(swiper.activeIndex)
}
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
}

const handleSwiperPrev = () => {
  console.log('slide prev')
  // swiperIns.slidePrev();
}

const handleSwiperNext = () => {
  console.log('slide next')
  // swiperIns.slideNext();
}
onMounted(() => {
})
</script>

<template>
  <swiper
      class="w-full h-full relative bg-black"
      style="border-radius: 1rem;"
      :space-between="0"
      :direction="swiperDirection"
      :modules="modules"
      :speed="300"
      :mousewheel="true"
      @swiper="onSwiper"
      @transitionStart="transitionStart"
      @slideChange="onSlideChange">
    <swiper-slide v-for="(item, index) in list" :key="index" class="h-full">
      <slot
          :item="item"
          :index="index"
          :activeIndex="activeIndex"
          v-if="activeIndex >= index - 1 && activeIndex <= index + 1"></slot>
    </swiper-slide>
  </swiper>
  <!-- 视频右侧控制按钮-->
  <div class="player-playswitch flex-center">
    <div class="player-playswitch-tab">
      <div class="player-playswitch-prev  ">
        <ChevronUp class="player-playswitch-icon" :size="28" :stroke-width="2" @click="handleSwiperPrev"/>
      </div>
      <div class="player-playswitch-next  ">
        <ChevronDown class="player-playswitch-icon" :size="28" :stroke-width="2" @click="handleSwiperNext"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player-playswitch {
  margin: auto 0 auto 1rem;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  align-items: center;

  .player-playswitch-tab {
    background-color: #e1e1e1;
    border-radius: 1.5rem;

    &:hover {
      backdrop-filter: blur(.5rem);
    }

    & .player-playswitch-icon {
      cursor: pointer;
    }

    .player-playswitch-prev {
      padding: .4rem;
      transition: all 0.5s ease;

      &:hover {
        color: #fff;
      }

    }

    .player-playswitch-next {
      padding: .4rem;
      transition: all 0.5s ease;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
