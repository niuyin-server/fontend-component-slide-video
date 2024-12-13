<script setup>
import {ref} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import {Mousewheel} from 'swiper/modules';

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
})

const modules = ref([Mousewheel])
const activeIndex = ref(0);
const swiperDirection = ref('vertical');

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

const onSlideChange = () => {
  // console.log('slide change');
}

</script>

<template>
  <swiper
      class="h-full relative bg-black"
      :space-between="0"
      :direction="swiperDirection"
      :modules="modules"
      :speed="400"
      :mousewheel="true"
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
</template>

<style scoped>

</style>
