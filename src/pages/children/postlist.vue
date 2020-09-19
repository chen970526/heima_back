<template>
  <div class="postlist">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="title" label="标题" width="780"></el-table-column>
        <el-table-column prop="user.nickname" label="用户" width="200"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">{{scope.row.type===1?'文章':'视频'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑文章" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分享文章" placement="top">
              <el-button type="warning" icon="el-icon-share"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除文章" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { articleList } from '@/myapi/user'
export default {
  data () {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 2,
      total: 0
    }
  },
  mounted () {
    this.initdata()
  },
  methods: {
    async initdata () {
      const res = await articleList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      this.tableData = res.data.data
      this.total = res.data.total
    },
    handleSizeChange (val) {
      this.pageSize = +val
      this.initdata()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageIndex = +val
      this.initdata()
      // console.log(`当前页: ${val}`)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="less" scoped>
.postlist {
  .box-card {
    margin: 30px 0;
  }
}
</style>
