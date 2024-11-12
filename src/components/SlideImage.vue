<script setup>
import {onMounted, ref} from 'vue';
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
import {ChevronLeft, ChevronRight} from 'lucide-vue-next'

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
      :navigation="{
        prevEl: '.image-swiper-button-prev',
        nextEl: '.image-swiper-button-next'
      }"
      :speed="400">
    <div class="image-swiper-button-prev flex justify-center items-center cursor-pointer rounded-full">
      <ChevronLeft/>
    </div><!--左箭头。如果放置在swiper外面，需要自定义样式。-->
    <div class="image-swiper-button-next flex justify-center items-center cursor-pointer rounded-full">
      <ChevronRight/>
    </div><!--右箭头。如果放置在swiper外面，需要自定义样式。-->
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

/*自定义 swiper 左右切换按钮*/
.image-swiper-button-prev,
.image-swiper-button-next {
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.13);
  color: #f4f4f4;
  padding: .5rem;
  transition: all .3s ease;

  &:hover {
    box-shadow: 0 0 0 1px rgb(0 0 0 / 0.05);
    background-color: rgba(0, 0, 0, 0.23);
    backdrop-filter: blur(1rem);
  }
}

.image-swiper-button-prev {
  left: 2rem;
}

.image-swiper-button-next {
  right: 2rem;
}

.swiper-button-disabled {
  background-color: rgba(0, 0, 0, 0.03);
  color: rgba(244, 244, 244, 0.5);
}
</style>
