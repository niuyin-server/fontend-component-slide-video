<script setup>
import {ref, onMounted} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import {Mousewheel, Navigation} from 'swiper/modules';
import {ChevronUp, ChevronDown} from "lucide-vue-next";

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
})

const navigation = ref({
  prevEl: ".swiper-slidenav-prev",
  nextEl: ".swiper-slidenav-next",
});

const prevEl = () => {
};

const nextEl = () => {
};

const modules = ref([Mousewheel, Navigation])
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

const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log('slide change');
}

onMounted(() => {
})
</script>

<template>
  <swiper
      class="w-full h-full relative bg-black flex"
      style="border-radius: 1rem;"
      :space-between="0"
      :direction="swiperDirection"
      :modules="modules"
      :navigation="navigation"
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
    </swiper-slide><!-- 视频右侧控制按钮-->
  </swiper>
  <div class="swiper-slidenav flex justify-center flex-row flex-wrap items-center">
    <div class="swiper-slidenav-tab">
      <div class="swiper-slidenav-prev" @click.stop="prevEl">
        <ChevronUp class="swiper-slidenav-icon" :size="28" :stroke-width="2"/>
      </div>
      <div class="swiper-slidenav-next" @click.stop="nextEl">
        <ChevronDown class="swiper-slidenav-icon" :size="28" :stroke-width="2"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiper-slidenav {
  margin: auto 0 auto 1rem;

  .swiper-slidenav-tab {
    background-color: rgba(225, 225, 225, 0.38);
    border-radius: 1.5rem;

    &:hover {
      backdrop-filter: blur(.5rem);
    }

    & .swiper-slidenav-icon {
      cursor: pointer;
    }

    .swiper-slidenav-prev {
      padding: .4rem;
      transition: all 0.5s ease;

      &:hover {
        color: #fff;
      }

    }

    .swiper-slidenav-next {
      padding: .4rem;
      transition: all 0.5s ease;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
