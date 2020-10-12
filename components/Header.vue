<template>
  <div class="header">
    <img src="../static/logo.jpg" alt="" />
    <ul class="nav">
      <li class="active">首页</li>
      <li>旅游攻略</li>
      <li>酒店</li>
      <li>国内机票</li>
    </ul>
    <div class="loginPage">登录/注册</div>
  </div>
</template>

<script>
export default {};
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
    li {
      font-size: 16px;
      font-family: "STZhongsong";
      margin: 0 10px;
      padding: 0 20px;
      cursor: pointer;
      &:hover {
        border-bottom: 5px solid #409eff;
        height: 60px;
      }
    }
    .active {
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