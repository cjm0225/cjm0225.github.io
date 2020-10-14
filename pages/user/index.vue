<template>
  <div class="center">
    <div class="page">
      <div class="top">
        <div class="nav" :class="{ active: showLogin }" @click="Login()">
          登录
        </div>
        <div class="nav" :class="{ active: !showLogin }" @click="Register()">
          注册
        </div>
      </div>
      <div class="bottom">
        <!-- 登录页面 -->
        <Login v-if="showLogin"></Login>

        <!-- 注册页面 -->
        <Register v-else></Register>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/user/Login";
import Register from "@/components/user/Register";
export default {
  components: {
    Login,
    Register,
  },
  data() {
    return {
      showLogin: true,
    };
  },
  methods: {
    Login() {
      this.showLogin = true;
    },
    Register() {
      this.showLogin = false;
    },
  },
};
</script>


<style lang="less" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("http://157.122.54.189:9095/assets/images/th03.jfif");
  height: 752px;

  .page {
    .top {
      display: flex;
      width: 100%;
      .nav {
        width: 200px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: #eeeeee;
        cursor: pointer;
      }
      .active {
        border-top: 3px solid #ffa500;
        color: #ffa500;
        background-color: #ffffff;
      }
    }
    .bottom {
      width: 400px;
      padding: 20px;
      padding-bottom: 1px;
      background-color: #fff;
    }
  }
}
</style>