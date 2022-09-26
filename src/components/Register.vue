<template>
  <div class="content">
    <div class="registerbox">
      <el-form
        :model="registerForm"
        :rules="registerFormRules"
        ref="registerFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="registerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-button type="success" @click="register">注册</el-button>
        <div class="toLogin">
          <router-link to="/">已完成注册？点击登录</router-link>
        </div>
      </el-form>
      <img
        class="move"
        src="../assets/login_l.jpg"
        style="width: 400px; height: 450px"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        nickname: "",
        email: "",
      },

      registerFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
      },

    };
  },
  methods: {
    register(){
      this.$refs.registerFormRef.validate(async valid => {
        if(!valid) return;
        const {data:res} = await this.$http.post('api/register',this.registerForm);
        if(res.status !== 0){
          return this.$message.error('用户注册失败')
        };
        this.$message.success('用户注册成功');
        this.$refs.registerFormRef.resetFields();
      })
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes imgMove {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(100px);
  }
}
.content {
  width: 100%;
  height: 100%;
  background: url("../assets/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.registerbox {
  width: 900px;
  height: 450px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #999;
  opacity: 0.7;
  box-shadow: 0px 0px 10px #000;
  .move {
    animation-name: imgMove;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    border-radius: 10px;
  }
}
.el-form {
  width: 400px;
  position: relative;
  margin-top: 50px;
}
.el-button {
  width: 300px;
  position: absolute;
  left: 25%;
}
.toLogin {
  position: absolute;
  bottom: 15%;
  left: 40%;
}
.upload{
  width: 140px;
}

</style>