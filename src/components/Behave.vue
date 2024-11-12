<script setup>
import {Heart, MessageCircleMore, Star, Share2} from "lucide-vue-next";

function like() {
  console.log("这是点赞");
}

function comment() {
  console.log("这是评论");
}

function collect() {
  console.log("这是收藏");
}

function share() {
  console.log("这是分享");
}

</script>

<template>
  <div class="behave-container">
    <div class="behave-btn like" @click="like">
      <Heart class="m-2"/>
      <span class="text-sm ">点赞</span>
    </div>
    <div class="behave-btn comment" @click="comment">
      <MessageCircleMore class="m-2"/>
      <span class="text-sm mt-1">评论</span>
    </div>
    <div class="behave-btn collect" @click="collect">
      <Star class="m-2"/>
      <span class="text-sm mt-1">收藏</span>
    </div>
    <div class="behave-btn share" @click="share">
      <Share2 class="m-2"/>
      <span class="text-sm mt-1">分享</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.behave-container {
  z-index: 1;
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  color: white;

  & .behave-btn {
    margin: .5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
