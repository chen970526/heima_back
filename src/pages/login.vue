<template>
  <div class="login">
    <div class="container">
      <img src="@/assets/avatar.jpg" class="avatar" alt />
      <el-form :rules="rules" :model="user" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="user.username" prefix-icon="icon-user" @focus="delmsg('username')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="icon-key" v-model="user.password" @focus="delmsg('password')"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="login-btn" type="primary" @click="userlogin">登陆</el-button>
    </div>
  </div>
</template>

<script>
import { login } from '../myapi/user'
export default {
  data () {
    return {
      user: {
        username: '10086',
        password: '123'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    delmsg (str) {
      this.$refs.ruleForm.clearValidate(str)
    },
    userlogin () {
      //   console.log(this.$refs.ruleForm)
      this.$refs.ruleForm.validate(async (valid, obj) => {
        // console.log(valid)
        // console.log(obj)
        if (valid) {
          const res = await login(this.user)
          console.log(res)
          if (res.data.message === '登录成功') {
            localStorage.setItem('heima_back_token', res.data.data.token)
            localStorage.setItem(
              'heima_back_user',
              JSON.stringify(res.data.data.user)
            )
            this.$message.success({
              showClose: true,
              message: res.data.message
            })
            this.$router.push({ path: '/' })
          }
        } else {
          this.$message.warning({
            showClose: true,
            message: '请输入用户名或密码'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
