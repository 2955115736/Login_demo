<template>
  <div>
    <el-card>
      <el-table :data="userList" border stripe style="width: 100%">
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="nickname" label="昵称"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="user_pic" label="头像"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showUser">更新信息</el-button>
            <el-button type="warning" @click="avatarVisible = true"
              >更换头像</el-button
            >
            <el-button type="danger" @click="passwordVisible = true"
              >修改密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 对话框 -->
      <el-dialog
        title="提示"
        :visible.sync="updateVisible"
        width="30%"
        @close="cleanForm"
      >
        <el-form
          :model="userForm"
          :rules="userFormRules"
          ref="userFormRef"
          label-width="100px"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="提示" :visible.sync="avatarVisible" width="30%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="avatarVisible = false">取 消</el-button>
          <el-button type="primary" @click="avatarVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 修改密码 -->
      <el-dialog title="提示" :visible.sync="passwordVisible" width="30%" @close="cleanPwdForm">
        <el-form
          :model="passwordForm"
          :rules="passwordFormRules"
          ref="passwordFormRef"
          label-width="100px"
        >
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input type="password" v-model="passwordForm.oldPwd" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="passwordForm.newPwd" placeholder="新密码不能与旧密码一致"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="passwordVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePwd"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      userForm: {},
      passwordForm:{
        oldPwd:'',
        newPwd:''
      },
      updateVisible: false,
      avatarVisible: false,
      passwordVisible: false,
      userFormRules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
      passwordFormRules:{
        oldPwd:[
          {required: true, message: "请输入旧密码", trigger: "blur"}
        ],
        newPwd:[
          {required: true, message: "请输入新密码", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$http.get("my/userinfo");
      if (res.status !== 0) {
        return this.$message.error("用户列表获取失败");
      }
      this.userList.push(res.data);
    },

    async showUser() {
      const { data: res } = await this.$http.get("my/userinfo");
      if (res.status !== 0) {
        return this.$message.error("获取信息列表失败");
      }
      this.userForm = res.data;
      this.updateVisible = true;
    },

    cleanForm() {
      this.$refs.userFormRef.resetFields();
    },

    updateUser() {
      this.$refs.userFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "my/userinfo",
          this.userForm
        );
        if (res.status !== 0) {
          return this.$message.error("修改用户信息失败");
        }
        this.updateVisible = false;
        this.$router.go(0)
        this.$message.success("用户信息修改成功");
      });
    },

    cleanPwdForm(){
      this.$refs.passwordFormRef.resetFields();
    },

    changePwd(){
      this.$refs.passwordFormRef.validate(async valid => {
        if(!valid) return;
        if(this.passwordForm.oldPwd === this.passwordForm.newPwd){
          return this.$message.warning('旧密码与新密码一致，请重新输入')
        };
        const {data:res} = await this.$http.post('my/updatepwd',this.passwordForm);
        if(res.status !== 0){
          return this.$message.error('修改密码失败')
        };
        this.$message.success('修改密码成功');
        this.passwordVisible = false;
      })
    }
  },
};
</script>

<style>
</style>