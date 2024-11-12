<script setup>
import {House} from 'lucide-vue-next'

const menus = [
  {
    id: 0,
    name: "首页",
    link: "/"
  }
]
</script>

<template>
  <el-header class="shadow">
    <el-row class="w-full h-full" :gutter="20">
      <el-col :span="20">
        <div class="w-full h-full flex ">
          <div class="flex items-center" v-for="item in menus">
            <router-link :to="item.link" class="flex justify-center items-center">
              <House/>
              <span class="ml-1">
               {{ item.name }}
             </span>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="flex justify-center items-center">
        login-user
      </el-col>
    </el-row>
  </el-header>
</template>

<style scoped>

</style>
