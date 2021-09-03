<template>
  <div>
     <el-table :data="comments">
       <el-table-column>
           <template slot-scope="scope">
              <div class="comment-list"> 
                 <div>
                   <el-tag type="info" size="small" effect="plain">会员</el-tag>
                   {{scope.row.username}} 评论了你的文章  {{scope.row.articleTitle}}
                 </div>
                 <div>
                   {{scope.row.createTime}}
                 </div>
              </div>
           </template>
       </el-table-column>
     </el-table>

     <!-- 分页 -->
     <el-pagination
       background=""
       layout="prev, pager, next"
       :total="count"
       :page-size="pageSize"
       :current-page="page"
       @current-change="changePage"></el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      comments: [],
      page: 1,
      pageSize: 0,
      count: 0
    }
  },
  created(){
    this.getData()
  },
  methods: {
    getData(){
      this.$http({
        path: '/comment/admin/find',
        method: 'get',
        params: {
          page: this.page,
          author: this.$store.state.user.username
        }
      }).then(res=>{
        this.comments = res.result
        this.page = res.page
        this.pageSize = res.pageSize
        this.count = res.count
      })
    },
    changePage(page){
      this.page = page
      this.getData()
    }
  }
}
</script>

<style>
 .comment-list{
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
</style>