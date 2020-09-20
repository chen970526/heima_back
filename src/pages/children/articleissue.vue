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
          <VueEditor :config="config" ref="textbox" />
        </el-form-item>
        <el-form-item label="视频" v-show="form.type===2">
          <el-upload
            class="upload-demo"
            :action="baseURL+'/upload'"
            :on-success="postvideo"
            :headers="gettoken()"
            :file-list="fileList"
          >
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
          <el-checkbox-group v-model="form.categories" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            :action="baseURL+'/upload'"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :headers="gettoken()"
            :on-success="postcover"
            :file-list="coverList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="postarticle">文章发布</el-button>
    </el-card>
  </div>
</template>

<script>
import {
  baseURL,
  categoryList,
  postarticle,
  getarticle,
  editarticle
} from '../../myapi/user'
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
export default {
  async mounted () {
    const res = await categoryList()
    this.cities = res.data.data.splice(2)
    this.init()
  },
  watch: {
    $route () {
      this.init()
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      /// ////////////////////////////
      isIndeterminate: false, // 选中框的状态 为false就是全选中
      checkAll: false, // 是否全选
      checkedCities: [], // 默认选中项
      cities: [],
      video: '',
      form: { title: '', content: '', categories: [], cover: [], type: 1 },
      baseURL,
      fileList: [],
      coverList: [],
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3333/upload',
          name: 'file',
          headers: this.gettoken(),
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
          headers: this.gettoken(),
          uploadSuccess (res, insert) {
            console.log(res)
            console.log(insert)
            insert('http://localhost:3333' + res.data.data.url)
          }
        }
      }
    }
  },
  components: {
    VueEditor
  },
  methods: {
    async init () {
      if (this.$route.params.id) {
        const res = await getarticle(this.$route.params.id)
        this.form = res.data.data
        this.form.categories = this.form.categories.map((v) => {
          return v.id
        })
        this.form.cover = this.form.cover.map((v) => {
          return { id: v.id, url: baseURL + v.url }
        })
        this.isIndeterminate = true
        this.form.cover.forEach((v) => {
          this.coverList.push({ id: v.id, url: v.url })
        })
        if (this.form.type === 1) {
          this.$refs.textbox.editor.clipboard.dangerouslyPasteHTML(
            0,
            this.form.content
          )
        } else {
          this.fileList.push({ url: this.form.content, name: this.form.title })
        }
        console.log(this.form)
      } else {
        this.form = {
          title: '',
          content: '',
          categories: [],
          cover: [],
          type: 1
        }
        // this.coverList.length = 0
        // console.log(this.coverList)
        // this.$refs.textbox.editor.clipboard.dangerouslyPasteHTML(0, `<p> </p>`)
        // console.dir(this.$refs.textbox.editor.clipboard.dangerouslyPasteHTML)
      }
    },
    // 获取本地token
    gettoken () {
      return { Authorization: localStorage.getItem('heima_back_token') }
    },
    // 文章发布按钮
    async postarticle () {
      if (this.form.type === 2) {
        this.form.content = this.video
      } else {
        this.form.content = this.$refs.textbox.editor.root.innerHTML
      }
      this.form.categories = this.form.categories.map((v) => {
        return { id: v }
      })
      console.log(this.form)
      let res
      if (this.$route.params.id) {
        res = await editarticle(this.$route.params.id, {
          title: this.form.title,
          content: this.form.content,
          categories: this.form.categories,
          cover: this.form.cover,
          type: this.form.type
        })
      } else {
        res = await postarticle(this.form)
      }

      console.log(res)
      if (
        res.data.message === '文章发布成功' ||
        res.data.message === '文章编辑成功'
      ) {
        this.handleCheckAllChange(false)
        this.$message.success(res.data.message)
        // this.$router.push({ name: 'Postlist' })
      }
    },
    // 处理上传视频
    postvideo (response, file, fileList) {
      console.log(response, file, fileList)
      console.log(file)

      this.video = baseURL + response.data.url
      console.log(this.video)
    },
    // 处理上传图片
    postcover (response, file, fileList) {
      console.log(response, file, fileList)
      this.form.cover.push({ id: response.data.id })
    },
    handleRemove (file, fileList) {
      console.log(file)
      this.form.cover = this.form.cover.filter((v, i) => {
        if (v.id !== file.id) {
          return v
        }
      })
      console.log(this.form.cover)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleCheckAllChange (val) {
      this.form.categories = val
        ? this.cities.map((i) => {
          return i.id
        })
        : []
      console.log(this.form.categories)
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      console.log(value)
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
