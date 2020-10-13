<template>
  <div>
    <el-carousel :interval="5000" arrow="always" height="759px">
      <el-carousel-item v-for="(url, index) of urls" :key="index">
        <el-image :src="url" fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: [
        "http://157.122.54.189:9095/assets/images/th01.jfif",
        "http://157.122.54.189:9095/assets/images/th02.jfif",
        "http://157.122.54.189:9095/assets/images/th03.jfif",
      ],
    };
  },
};
</script>


<style lang="less" scoped>
</style>