<template>
  <div class="upload-container">
    <!--<el-form-item prop="image_uri" style="margin-bottom: 0">-->
    <!--  <Upload-->
    <!--    v-model="postForm.image_uri"-->
    <!--    :file-list="fileList"-->
    <!--    :disabled="isEdit"-->
    <!--    @onSuccess="onUploadSuccess"-->
    <!--    @onRemove="onUploadRemove"-->
    <!--  />-->
    <!--</el-form-item>-->
    <div>
      {{ info }}
    </div>
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="false"
      :limit="1"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-exceed="onExceed"
      :disabled="disabled"
      drag
      show-file-list
      accept="application/epub+zip"
      class="image-upload"
    >
      <i class="el-icon-upload">
        <div v-if="fileList.length===0" class="el-upload__text">
          请将电子书拖入或<em>点击上传</em>
        </div>
        <div v-else class="el-upload__text">
          图书已上传
        </div>

      </i>

    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/api/qiniu'

export default {
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  // props: {
  //   imageUri: String,
  //   postForm: {
  //     image_uri: String
  //   },
  //   fileList: Array,
  //   isEdit: Boolean,
  //   onUploadSuccess: Function,
  //   onUploadRemove: Function
  // }

  data() {
    return {
      action: `${process.env.VUE_APP_BASE_API}/book/upload`,
      info: '上传电子书分为两步：上传电子书和新增电子书。首先需要上传epub电子书文件，服务器会对epub文件进行解析，解析成功后会将电子书的各字段填入表单，之后我们只需要手动点击新增电子书即可完成电子书的保存。查看 课程官网 获取更多开发指引。'
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    beforeUpload(file) {
      console.log(file)
      this.$emit('beforeUpload', file)
    },
    onSuccess() {

    },
    onError(err) {
      const errMsg = err.message && JSON.parse(err.message)
      this.$message({
        message: (errMsg && errMsg.msg && `上传失败，失败原因是：${errMsg.msg}`) || '上传失败',
        type: 'error'
      })
      this.$emit('onError', err)// 让父组件自由处理
    },
    onRemove() {

    },
    onExceed() {
      this.$message({
        message: '每次只能上传一本电子书',
        type: 'warning'
      })
    }

  }

}
</script>
<style lang="scss" scoped>

</style>
