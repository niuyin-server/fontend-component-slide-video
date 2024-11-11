<script setup>
import {ref, onMounted} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';

const swiperDirection = ref('vertical')
// const platformList = ref([])
//
// const loadPlatformList = async () => {
//   const platformListRes = await openAuthPlatformList()
//   if (platformListRes.data.code === 200) {
//     platformList.value = platformListRes.data.data;
//   }
//   console.log(platformList.value)
// }

const transitionStart = (swiper) => {
  //表示没有滑动,不做处理
  if (activeIndex.value === swiper.activeIndex) {
    // 表示是第一个轮播图
    if (swiper.swipeDirection === "prev" && swiper.activeIndex === 0) {
      emit("refresh");
    } else if (
        swiper.swipeDirection === "next" &&
        swiper.activeIndex === list.length - 1
    ) {
      emit("toBottom");
    }
  } else {
    activeIndex.value = swiper.activeIndex;
    // 为了预加载视频，提前load 数据
    if (swiper.activeIndex === list.length - 1) {
      emit("load");
    }
  }
}
const activeIndex = ref(0)
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};

onMounted(() => {
  // loadPlatformList()
})

</script>

<template>
  <div class="main-container h-full">
    <swiper
        class="h-full relative"
        :slides-per-view="1"
        :space-between="20"
        :mousewheel="true"
        :direction="swiperDirection"
        :scrollbar="{ draggable: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper>

  </div>
</template>

<style scoped>
.main-container {
  background-color: #80b0f4;
}
</style>
