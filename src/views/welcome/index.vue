<template>
  <div>
    <el-card :body-style="{height:'calc(100vh - 100px)',padding:0}">
      <div class="welc">
        <h5 class="font">welcome~</h5>
      </div>
    </el-card>
  </div>
</template>

<script setup>
</script>

<style scoped lang="sass">
.welc
  width: 100%
  height: 100%
  background-image: url('../../assets/img/login-background.png')
  display: flex
  justify-content: center
  align-items: center
  .font
    font-size: 200px
    color: #fff
</style>