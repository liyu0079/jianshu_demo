<template>
  <div>
   <el-form ref="form" :model="form" label-width="80px">
     <el-form-item label="头像">
        <div class="avatar-div">
       <img v-show="form.avatar" :src="form.avatar" class="small-img">
      <el-upload
        action="http://localhost:3000/upload/img"
        name="myfile"
        :headers="uploadHeader"
        :show-file-list="false"
        :on-success="onSuccess">
        <el-button>上传</el-button>
       </el-upload>
       </div>
     </el-form-item>
     <el-form-item v-model="form.username" disabled label="用户名">
      <el-col :span="6">
        <el-input></el-input>
      </el-col>
     </el-form-item>
      <el-form-item label="性别">
      <el-radio v-model="form.sex" label="男">男</el-radio>
      <el-radio v-model="form.sex" label="女">女</el-radio>
      <el-radio v-model="form.sex" label="保密">保密</el-radio>
     </el-form-item>
      <el-form-item label="个人简介">
      <el-col :span="6">
        <el-input v-model="form.desc" type="textarea" rows="3" placeholder="填写你的个人简介"></el-input>
      </el-col>
     </el-form-item>
      <el-form-item label="手机号">
        <el-col :span="6">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-col>
     </el-form-item>
      <el-form-item label="电子邮箱">
       <el-col :span="6">
          <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
        </el-col>
     </el-form-item>
      <el-form-item>
        <el-button type="success" round @click="save">更新</el-button>
     </el-form-item>
   </el-form>



  
  </div>
</template>
 
<script>
export default {
   data(){
     return {
       uploadHeader: {
         authorization: "Bearer " + localStorage.token,
       },
       form:{
         _id: '',
         username: '',
         sex: '男',
         avatar: '',
         desc: '',
         email: '',
         phone: ''
       }
     }
   },
   created(){
     this.$store.state.user;
   },
   methods:{
     onSuccess(res){
         this.form.avatar = res.data
     },
     save(){
       this.$http({
            path: '/users/update/personal',
            method: 'post',
            params: this.form   
       }).then(res=>{
         this.$message({
           message:res.msg,
           type: res.code === 200 ? 'success' : 'error'
         })
       })

     }
   }
}


</script>
 
<style scoped>
 .small-img{
   width:100px;
   height: 100px;
   margin-right: 20px;
 }
 .avatar-div{
   display: flex;
   align-items: center;
 }
</style>