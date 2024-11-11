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

// const transitionStart = (swiper) => {
//   //表示没有滑动,不做处理
//   if (activeIndex.value === swiper.activeIndex) {
//     // 表示是第一个轮播图
//     if (swiper.swipeDirection === "prev" && swiper.activeIndex === 0) {
//       emits("refresh");
//     } else if (
//         swiper.swipeDirection === "next" && swiper.activeIndex === props.list.length - 1
//     ) {
//       emits("toBottom");
//     }
//   } else {
//     activeIndex.value = swiper.activeIndex;
//     // 为了预加载视频，提前load 数据
//     if (swiper.activeIndex === props.list.length - 1) {
//       emits("load");
//     }
//   }
// }

const transitionStart = (swiper) => {
  // 检查 swiper 是否有效
  if (!swiper || typeof swiper !== 'object') {
    console.error('Invalid swiper object');
    return;
  }

  // 检查 props.list 是否有效且不为空
  if (!props.list || !Array.isArray(props.list) || props.list.length === 0) {
    console.error('Invalid or empty list');
    return;
  }

  const listLength = props.list.length;

  // 如果当前索引没有变化
  if (activeIndex.value === swiper.activeIndex) {
    // 如果是第一个轮播图且方向为上一个
    if (swiper.swipeDirection === "prev" && swiper.activeIndex === 0) {
      emits("refresh");
    }
    // 如果是最后一个轮播图且方向为下一个
    else if (swiper.swipeDirection === "next" && swiper.activeIndex === listLength - 1) {
      emits("toBottom");
    }
  } else {
    // 更新当前索引
    activeIndex.value = swiper.activeIndex;
    // 如果是最后一个轮播图，预加载数据
    if (swiper.activeIndex === listLength - 1) {
      emits("load");
    }
  }
}

</script>

<template>
  <swiper
      class="h-full relative"
      :space-between="0"
      :direction="swiperDirection"
      :modules="modules"
      :speed="400"
      :mousewheel="true"
      @transitionStart="transitionStart">
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
