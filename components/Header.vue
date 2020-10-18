<template>
  <div class="header">
    <img src="../static/logo.jpg" />
    <div class="nav">
      <!-- 相当于vue的router-link 可以实现路由跳转-->
      <nuxt-link to="/">首页</nuxt-link>
      <nuxt-link to="/article">旅游攻略</nuxt-link>
      <nuxt-link to="/hotel">酒店</nuxt-link>
      <nuxt-link to="/airTicket">国内机票</nuxt-link>
    </div>
    <div
      class="loginPage"
      @click="$router.push('/user')"
      v-if="!$store.state.user.userinfo.token"
    >
      登录/注册
    </div>
    <el-dropdown @command="handleCommand" v-else>
      <div class="userinfo el-dropdown-link">
        <img
          :src="
            $axios.defaults.baseURL +
            $store.state.user.userinfo.user.defaultAvatar
          "
          v-if="$store.state.user.userinfo.user"
        />
        <div class="nickname" v-if="$store.state.user.userinfo.user">
          {{ $store.state.user.userinfo.user.nickname }}
        </div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.$store.commit("user/setUserInfo", {});
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 200px;
  border-bottom: 1px solid #ccc;
  box-shadow: 4px 1px 6px 0px #888888;
  line-height: 60px;
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
    cursor: pointer;

    &:hover {
      color: #409eff;
      text-decoration: underline;
    }
  }
  .userinfo {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .nickname {
      color: royalblue;
      font-size: 14px;
    }
  }
}
</style>