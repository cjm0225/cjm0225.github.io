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
        <el-form :model="form" v-if="showLogin" :rules="rules" ref="LoginForm">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入手机号/账号"
              @focus="clearValidate('username')"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password
          "
              v-model="form.password"
              placeholder="请输入密码"
              @focus="clearValidate('password')"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()"> 提交 </el-button>
            <el-button @click="resetForm()"> 重置 </el-button>
          </el-form-item>
        </el-form>

        <!-- 注册页面 -->
        <el-form v-else :model="form" :rules="rules" ref="LoginForm">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入手机号/账号"
              @focus="clearValidate('username')"
            >
            </el-input>
          </el-form-item>

          <el-form-item class="authcode" prop="authcode">
            <el-input
              v-model="form.authcode"
              placeholder="请输入验证码"
              class="authcodeInput"
              @focus="clearValidate('authcode')"
            >
            </el-input>
            <el-button class="authcodeButton"> 发送验证码 </el-button>
          </el-form-item>

          <!-- 昵称输入框 -->
          <el-form-item prop="nickname">
            <el-input
              v-model="form.nickname"
              placeholder="请输入昵称"
              @focus="clearValidate('nickname')"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="nickname">
            <el-input
              v-model="form.nickname"
              placeholder="请输入昵称"
              @focus="clearValidate('nickname')"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              @focus="clearValidate('password')"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="anginPassword">
            <el-input
              type="text"
              v-model="form.anginPassword"
              placeholder="请再次输入密码"
              @focus="clearValidate('anginPassword')"
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()"> 提交 </el-button>
            <el-button @click="resetForm()"> 重置 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: true,
      form: {
        username: "",
        password: "",
        authcode: "",
        nickname: "",
        anginPassword: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入合法的手机号码",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            // 密码正则:至少包含 数字和英文，长度6-20
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: "请输入正确的密码",
            trigger: "blur",
          },
        ],
        authcode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
          {
            pattern: /^\d{6}$/,
            message: "请输入六位的验证码",
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
        ],
        anginPassword: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    Login() {
      this.showLogin = true;
      this.$refs.LoginForm.resetFields();
    },
    Register() {
      this.showLogin = false;
      this.$refs.LoginForm.resetFields();
    },
    submitForm() {},
    resetForm() {},
    clearValidate(propName) {
      this.$refs.LoginForm.clearValidate(propName);
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
      .authcode {
        .authcodeInput {
          width: 68%;
        }
        .authcodeButton {
          color: #c0c4cc;
          width: 30%;
        }
      }
    }
  }
}
</style>