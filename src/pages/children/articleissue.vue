<template>
  <div class="issue">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章" v-show="form.type===1">
          <VueEditor :config="config" />
        </el-form-item>
        <el-form-item label="视频" v-show="form.type===2">
          <el-upload class="upload-demo" :action="baseURL">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="http://127.0.0.1:3333/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { baseURL, categoryList } from '../../myapi/user'
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
export default {
  async mounted () {
    const res = await categoryList()
    console.log(res)
    // console.log(res.data.data.shift())
    this.cities = res.data.data.map((i) => {
      return i.name
    })
    console.log(this.cities)
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      /// ////////////////////////////
      isIndeterminate: true, // 选中框的状态 为false就是全选中
      checkAll: false, // 是否全选
      checkedCities: [], // 默认选中项
      cities: [],
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      baseURL,
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3333/upload',
          name: 'file',
          headers: { Authorization: localStorage.getItem('heima_back_token') },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            console.log(res)
            console.log(insert)
            insert('http://localhost:3333' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3333/upload',
          name: 'file',

          uploadSuccess (res, insert) {
            console.log(res)
            console.log(insert)
            insert('http://localhost:3333' + res.data.url)
          }
        }
      }
    }
  },
  components: {
    VueEditor
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
      console.log(this.isIndeterminate)
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>

<style lang="less" scoped>
.issue {
  .box-card {
    margin: 30px 0;
  }
}
</style>
