<script setup>

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
    <div class="mantle">
      <div class="right" @click.stop="">
        <div class="right-btn like" @click="like">点赞</div>
        <div class="right-btn comment" @click="comment">评论</div>
        <div class="right-btn collect" @click="collect">收藏</div>
        <div class="right-btn share" @click="share">分享</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.behave-container {
  z-index: 1;
  position: absolute;
  right: 0;
  bottom: 0;
  color: blue;
}
</style>
