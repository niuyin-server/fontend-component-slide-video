<script setup>
import Header from './Header.vue'
import Main from './Main.vue'
import Aside from './Aside.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="common-layout h-full w-full">
    <el-container class="h-full w-full" >
      <Aside/>
      <el-container :direction="'vertical'">
        <Header/>
        <Main/>
        <!--      <Footer/>-->
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-main {
  --el-main-padding: 1rem;
}
</style>
