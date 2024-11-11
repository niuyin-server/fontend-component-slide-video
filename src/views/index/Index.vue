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
        :space-between="50"
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
