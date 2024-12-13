<template>
  <div class="slider" :class="{ 'is-vertical': vertical }">
    <div class="slider-runway" >
      <div class="slider-bar" :style="barStyle"></div>
      <div class="slider-button" :style="buttonStyle" @mousedown="onMouseDown"></div>
      <div v-if="showStops" class="slider-stops">
        <span v-for="stop in stops" :key="stop" :style="{ left: stop + '%' }"></span>
      </div>
    </div>
    <div v-if="showTooltip" class="slider-tooltip" :style="tooltipStyle">
      {{ formattedValue }}
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {useVModel} from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  vertical: {
    type: Boolean,
    default: false
  },
  showStops: {
    type: Boolean,
    default: false
  },
  showTooltip: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const currentValue = useVModel(props, 'modelValue', emit);

const percent = computed(() => {
  return ((currentValue.value - props.min) / (props.max - props.min)) * 100;
});

const barStyle = computed(() => ({
  [props.vertical ? 'height' : 'width']: `${percent.value}%`
}));

const buttonStyle = computed(() => ({
  [props.vertical ? 'top' : 'left']: `${percent.value}%`,
  transform: `translate(${-50}%, ${props.vertical ? -50 : 0}%)`
}));

const stops = computed(() => {
  const stopCount = (props.max - props.min) / props.step;
  const stops = [];
  for (let i = 0; i <= stopCount; i++) {
    stops.push((i / stopCount) * 100);
  }
  return stops;
});

const formattedValue = computed(() => {
  return currentValue.value;
});

const tooltipStyle = computed(() => ({
  [props.vertical ? 'bottom' : 'left']: `${percent.value}%`,
  transform: `translate(${-50}%, ${props.vertical ? -50 : 0}%)`
}));

const getValueFromPercent = (percent) => {
  let value = (percent / 100) * (props.max - props.min) + props.min;
  value = Math.round(value / props.step) * props.step;
  return Math.max(props.min, Math.min(props.max, value));
};

const dragging = ref(false);
const startX = ref(0);
const currentX = ref(0);
const startPosition = ref(0);
const newPosition = ref(0);

const onMouseDown = (event) => {
  dragging.value = true;
  startX.value = event.clientX;
  startPosition.value = percent.value;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event) => {
  if (dragging.value) {
    currentX.value = event.clientX;
    newPosition.value = startPosition.value + (currentX.value - startX.value) / event.target.offsetWidth * 100;
    currentValue.value = getValueFromPercent(newPosition.value);
  }
};

const onMouseUp = () => {
  if (dragging.value) {
    dragging.value = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    emit('change', currentValue.value);
  }
};

onMounted(() => {
  currentValue.value = props.modelValue;
});

onUnmounted(() => {
  if (dragging.value) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
});
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #d3dce6;
  cursor: pointer;
}

.slider.is-vertical {
  width: 4px;
  height: 100%;
}

.slider-runway {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-bar {
  position: absolute;
  height: 100%;
  background-color: #409eff;
}

.slider-button {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #409eff;
  cursor: pointer;
}

.slider-stops {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.slider-stops span {
  width: 2px;
  height: 100%;
  background-color: #ebebeb;
}

.slider-tooltip {
  position: absolute;
  white-space: nowrap;
  padding: 4px 8px;
  color: #fff;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  transform: translateX(-50%);
}

.slider-tooltip.is-vertical {
  transform: translateY(-50%);
}
</style>
