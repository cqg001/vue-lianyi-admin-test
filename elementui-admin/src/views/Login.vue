<template>
  <div id="login" :style="'height:'+height+'px'">
    <h1 style="margin-top: 200px;margin-bottom: 40px">Login Form</h1>
    <el-form>
      <el-form-item style="background-color: #283443;">
        <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="username">
        </el-input>
      </el-form-item>
      <el-form-item  style="background-color: #283443;">
        <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-cpu" show-password
            v-model="password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <router-link to="/main">
          <el-button style="margin-top: 10px;width:450px" type="primary">登录</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      height: 2000,
      username: "",
      password: ""
    }
  },
  mounted() {
    var height = window.innerHeight
    this.height = height
    window.addEventListener('resize', () => {
      var height = window.innerHeight
      this.height = height
    })
  }
}
</script>

<style scoped>

#login {
  width: 100%;
  height: 100%;
  background-color: #2D3A4B;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}

#login h1 {
  color: #fff;
}

#login .el-input {
  width: 450px;
  margin-bottom: 8px;
  color: gray;
  /*font-size: 20px;*/
  background: #283443 !important;
}

#login .el-input__inner {
  color: #42b983 !important;
}
</style>