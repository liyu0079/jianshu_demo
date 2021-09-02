<template>
  <div>
    <el-form  label-width="100px">
      <el-form-item label="文章标题">
          <el-input v-model="form.title" clearable="" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
         <div id="editor"></div>
      </el-form-item>
      <el-form-item label="文章来源">
          <el-radio v-model="form.stemfrom" label="原创">原创</el-radio>
          <el-radio v-model="form.stemfrom" label="转载">转载</el-radio>
      </el-form-item>
      <el-form-item>
         <el-button type="success" round @click="submit">更新文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  data(){
    return {
      form: {
        id: 0,
        _id: '',
        title: '',
        stemfrom: '',
        author: this.$store.state.user.username,
        content: ''
      },
      editor: null
    }
  },
  created(){
    let id = this.$route.query.id
    this.$http({
      path: '/article/update',
      method: 'get',
      params: {
        id
      }
    }).then(res=>{
      let article = res.result
      this.form.id = article.id
      this.form.title = article.title
      this.form.stemfrom = article.stemfrom
      this.form.content =article.content
    })
  },
  mounted(){
    //创建wangEditor实例
    let editor = new Editor('#editor')
    
    //配置上传图片的接口地址
    this.editor.config.uploadImgServer =`http://localhost:3000/upload/editor/img`
    this.editor.config.uploadFileName = 'editorFile'
    this.editor.config.uploadImgHeaders = {
      authorization: "Bearer " + localStorage.token
    }
    //设置富文本编辑器高度
    // this.editor.config.hight = 600
    //设置提示文字
    this.editor.config.placeholder = '编辑文章内容'

    this,editor.create()
    
  },
  watch:{
     form: {
       handler(val){
         //初始化富文本编辑器的内容
         this.editor.txt.html(this.form.content)

       },
       deep:true
     }
  },
  methods: {
    submit(){
      //获取文章内容
      let content = this.editor.txt.html()

      let date = new Date()
      this.$http({
        path: '/article/update',
        method: 'post',
        params: {
          id: this.form.id,
          title: this.form.title,
          stemfrom: this.form.stemfrom,
          content
        }
      }).then(res=>{
        this.$message({
          message: res.msg,
          type: res.code === 200 ? "success" : "error"
        });
      })
    }
  }
}
</script>

<style>

</style>