<template>
  <div>
    路由实例
    <el-button>{{ msg }}</el-button>
    <el-row gutter="20">
      <el-col span="6">
        <el-input v-model="searchParam.name" />
      </el-col>
      <el-col span="6">
        <el-input v-model="searchParam.corp" />
      </el-col>
      <el-col span="6" />
      <el-col span="6">
        <el-button @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="tableData" style="width: 50%" border="true">
      <el-table-column prop="date" label="日期" width="180" align="center" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </div>

  <!-- <div>

  </div>-->
</template>

<script>
export default {
  name: 'Create',
  components: {},
  data() {
    return {
      msg: '我是一个按钮',
      tableData: [
        {
          date: '2020-02',
          name: '小妖',
          address: '福建'
        },
        {
          date: '2020-03',
          name: '小妖乖',
          address: '福建福州'
        },
        {
          date: '2020-02',
          name: '小妖乖乖',
          address: '福建福州长乐'
        }
      ],
      searchParam: {
        name: '',
        corp: ''
      }
    }
  },
  methods: {
    search: function search() {
      alert(this.searchParam.name)
      alert(this.searchParam.corp)
      this.tableData = [
        {
          date: '2020-02',
          name: '小keai ',
          address: '福建'
        }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
