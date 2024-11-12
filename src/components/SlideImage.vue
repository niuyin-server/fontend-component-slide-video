<script setup>
import {onMounted, ref} from 'vue';
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';

const props = defineProps({
  imageList: {
    type: Array,
    default: () => []
  },
})

const swiperDirection = ref('horizontal')
const modules = ref([Navigation, Pagination])

onMounted(() => {
  console.log(props.imageList)
})

</script>

<template>
  <Swiper
      class="h-full relative bg-black"
      :space-between="0"
      :direction="swiperDirection"
      :modules="modules"
      :pagination="{ clickable: true }"
      :navigation="true"
      :speed="300">
    <SwiperSlide v-for="(item, index) in imageList" :key="index"
                 class="h-full">
      <div class="item-image-box h-full relative">
        <img class="item-image-box--image w-full h-full object-contain" :src="item" alt=""/>
        <img class="item-image-box--blur-cover w-full h-full object-cover" :src="item" alt=""/>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss">
.item-image-box {
  z-index: -1;
  overflow: hidden;

  &--image {
    z-index: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &--blur-cover {
    filter: blur(5rem);
    z-index: -1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

}

:deep(.swiper-pagination ) {
  display: flex;
  justify-content: space-between;
}

:deep(.swiper-pagination-bullet) {
  flex: 1;
  height: 5px;
  text-align: center;
  border-radius: 2px;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #f4f4f4;
}
</style>
