<template>
  <div>
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

<style>
</style>