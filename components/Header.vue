<template>
  <div class="header">
    <img src="../static/logo.jpg" alt="" />
    <div class="nav">
      <nuxt-link to="/">首页</nuxt-link>
      <nuxt-link to="/article">旅游攻略</nuxt-link>
      <nuxt-link to="/hotel">酒店</nuxt-link>
      <nuxt-link to="/airTicket">国内机票</nuxt-link>
    </div>
    <div class="loginPage" @click="$router.push('/user')">登录/注册</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 200px;
  line-height: 60px;
  height: 60px;
  img {
    cursor: pointer;
    margin-right: 10px;
  }
  .nav {
    flex: 1;
    display: flex;
    a {
      font-size: 16px;
      margin: 0 10px;
      padding: 0 20px;
      cursor: pointer;
      &:hover {
        border-bottom: 5px solid #409eff;
        height: 60px;
      }
    }
    .nuxt-link-exact-active {
      background-color: #409eff;
      color: #fff;
    }
  }
  .loginPage {
    font-size: 13px;
    letter-spacing: 1px;
    color: #888;
    &:hover {
      cursor: pointer;
      color: #409eff;
      text-decoration: underline;
    }
  }
}
</style>