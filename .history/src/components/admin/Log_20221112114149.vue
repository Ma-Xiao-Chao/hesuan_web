<template>
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </template>
      
      <script>
        export default {
          data() {
            return {
              tableData: []
            }
          },
          methods: {
              getData(){
                 this.$axios.post('/log/select',{
                 }
                 ) .then(res=>{
                     if(res.data.code==1){
                         this.tableData=res.data.data
                     }
                 })
              }
          }
        }
      </script>