<template>
  <div class="content">
    <div class="loginbox">
      <img style="width:300px;height:400px;border-radius:10px" src="../assets/login_l.jpg"/>
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="100px"
      >
        <img src="../assets/header.jpg" style="width:80px;height:80px;border-radius:50%;margin:20px 0 20px 200px"/>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
        <div class="toRegister">
            <router-link to="/register">未拥有账户？点击注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },

      //验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, trigger: "blur" },
        ],
      },
    };
  },
  methods:{
    login(){
        this.$refs.loginFormRef.validate(async valid => {
            if(!valid) return;
            const {data:res} = await this.$http.post('api/login',this.loginForm);
            console.log(res);
            if(res.status != 0){
                return this.$message.error('登录失败')
            }
            this.$message.success('登录成功');
            window.sessionStorage.setItem('token',res.token);
            this.$router.push({path:'/index'})
        })
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  background: url("../assets/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginbox {
  width: 800px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  border:1px solid #999;
  opacity: 0.7;
  box-shadow:0px 0px 10px #000;
}
.el-form {
  width: 400px;
  position: relative;
}
.btn{
    position: absolute;
    left: 25%;
    .el-button{
        width: 300px;
    }
}
.toRegister{
    position: absolute;
    left: 42%;
    bottom: 15%;
}

</style>