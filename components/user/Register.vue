<template>
  <div>
    <el-form :model="form" :rules="rules" ref="LoginForm">
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入手机号/账号"
          @focus="clearValidate('username')"
        >
        </el-input>
      </el-form-item>

      <el-form-item id="authcode" prop="authcode">
        <el-input
          v-model="form.authcode"
          placeholder="请输入验证码"
          class="authcodeInput"
          @focus="clearValidate('authcode')"
        >
        </el-input>
        <el-button class="authcodeButton"> 发送验证码 </el-button>
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
            message: "至少包含 数字和英文，长度6-20",
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
    submitForm() {},
    resetForm() {},
    clearValidate(propName) {
      this.$refs.LoginForm.clearValidate(propName);
    },
  },
};
</script>

<style lang="less" scoped>
#authcode {
  .authcodeInput {
    width: 68%;
  }
  .authcodeButton {
    color: #c0c4cc;
    width: 30%;
  }
}
</style>