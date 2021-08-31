<template>
   <div>
     hello jianshu
     <el-button type="success">按钮</el-button>
     
   </div>
</template>

<script>
export default {
  created(){
       this.$http({
         path: 'https://cnodejs.org/api/v1/topics',
         method: 'get',
         params:{

         }
       }).then(res=>{
         console.log(res)
       })
  }
    // mounted(){
    //   this.$axios.get('http://localhost:3000/users/find').then(res=>{
    //     console.log(res.data)
    //   }).catch(err=>{
    //     console.error('请求异常',err)
    //   })
    // }
}
</script>

<style>

</style>