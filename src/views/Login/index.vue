<template>
  <div class="login">
    <el-card>
      <div class="login-title">简书后台管理系统</div>
      <el-form :model="form" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model.trim="form.username"
            placeholder="请输入用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" v-model.trim="form.pwd" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-switch
            style="margin-right:20px;"
            v-model="state"
            inactive-color="#F56C6C"
            :inactive-text="state ? '还没有账号？点击注册':'已有账号，点击登录'"
            @change="changeState"
          ></el-switch>
          <el-button
            :type="state ? 'primary' : 'danger'"
            @click="submit('ruleForm')"
          >{{state ? '登 录' : '注 册'}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //设置表单校验规则
    let validatorUserName = (rule, value, callback) => {
      //用户名规则
      if (value === "") {
        return callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    let validatorPwd = (rule, value, callback) => {
      //密码规则
      if (value === "") {
        return callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      form: {
        //登录的表单项
        username: "",
        pwd: "",
      },
      rules: {
        //表单校验规则
        username: [{ validator: validatorUserName, trigger: "blur" }],
        pwd: [{ validator: validatorPwd, trigger: "blur" }],
      },
      state: true, //按钮状态，true为登录，false为注册
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            path: this.state ? "/users/login" : "/users/reg",
            method: "post",
            params: {
              username: this.form.username,
              pwd: this.form.pwd,
            },
          }).then((res) => {
            if (res.code === 200 && this.state) {
              localStorage.token = res.token;
              this.$router.push({
                path: "/admin",
              });
            }
            this.$message({
              message: res.msg,
              type: res.code === 200 ? "success" : "error",
            });
          });
        }
      });
    },
    changeState() {
      //改变登录按钮状态
      this.form = {
        username: "",
        pwd: "",
      };
    },
  },
};
</script>

<style scoped>
/* 登录页面背景图片样式 */
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/bg-01.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* el-card卡片组件样式 */
.el-card {
  width: 420px;
  height: 300px;
}
/* 登录标题样式 */
.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
}
/* 登录按钮 */
.login-btn {
  text-align: right;
}
</style>