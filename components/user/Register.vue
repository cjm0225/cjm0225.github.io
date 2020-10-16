<template>
  <div>
    <el-form :model="form" status-icon :rules="rules" ref="RegisterForm">
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入手机号/账号"
          @focus="clearValidate('username')"
          @keyup.native.enter="submitForm"
        >
        </el-input>
      </el-form-item>

      <el-form-item id="captcha" prop="captcha">
        <el-input
          v-model="form.captcha"
          placeholder="请输入验证码"
          class="captchaInput"
          @focus="clearValidate('captcha')"
          @keyup.native.enter="submitForm"
        >
        </el-input>
        <el-button class="captchaButton" @click="captchaSend">
          发送验证码
        </el-button>
      </el-form-item>

      <el-form-item prop="nickname">
        <el-input
          v-model="form.nickname"
          placeholder="请输入昵称"
          @focus="clearValidate('nickname')"
          @keyup.native.enter="submitForm"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          @focus="clearValidate('password')"
          @keyup.native.enter="submitForm"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="anginPassword">
        <el-input
          type="password"
          v-model="form.anginPassword"
          placeholder="请再次输入密码"
          @focus="clearValidate('anginPassword')"
          @keyup.native.enter="submitForm"
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
    //   自定义检验规则，二次检验密码
    // 接收三个参数:rule,value,callback
    // rule:检验规则
    // value:表单项的值
    // callback:放行函数(必须调用),调用该函数意味着已检验完成
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value != this.form.password) {
        callback(new Error("与上一次输入的密码不一样"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        captcha: "",
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
            // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            pattern: /^\d{6,12}$/,
            message: "密码格式不正确,必须6到12位数字",
            trigger: "blur",
          },
        ],
        captcha: [
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
            validator: checkPassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      // 因为api接口数据要求只能发送四个数据参数,所以要对数据进行处理
      const { anginPassword, ...data } = this.form;
      //   发送注册请求
      this.$refs.RegisterForm.validate()
        .then(() => {
          this.$axios({
            method: "post",
            url: "accounts/register",
            data: data,
          })
            .then((response) => {
              this.$message.success("注册成功");
              this.$store.commit("user/setUserInfo", response.data);
              this.$router.push("/");
            })
            .catch((response) => {
              this.$message.error(response.response.data.message);
            });
        })
        .catch(() => {
          this.$message.error("填写的格式错误,请认真检查格式再重新填写");
        });
    },
    resetForm() {
      this.$refs.RegisterForm.resetFields();
    },
    clearValidate(propName) {
      this.$refs.RegisterForm.clearValidate(propName);
    },
    captchaSend() {
      console.log(this.form.username);
      if (this.form.username === "") {
        this.$message.error("手机号不能为空");
        return;
      }
      this.$axios({
        method: "post",
        url: "captchas",
        data: {
          tel: this.form.username,
        },
      }).then((response) => {
        this.$message.success("发送验证码成功" + response.data.code);
      });
    },
  },
};
</script>

<style lang="less" scoped>
#captcha {
  .captchaInput {
    width: 68%;
  }
  .captchaButton {
    color: #c0c4cc;
    width: 30%;
  }
}
</style>