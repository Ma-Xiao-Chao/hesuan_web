<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-data"></i> 操作日志
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="tname.name" placeholder="表名" class="handle-select mr10">
                    <el-option v-for="(item, index) in tname1" :key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
                <el-input v-model="operation" placeholder="操作" class="handle-input mr10"></el-input>
                <template>
                    <el-date-picker class="mr10" v-model="time" type="datetimerange" :picker-options="pickerOptions"
                        range-separator="至" start-placeholder="操作时间" end-placeholder="操作时间" value-format="yyyy-MM-dd HH:mm:ss"
                        align="right">
                    </el-date-picker>
                </template>
                <el-button type="primary" icon="el-icon-search" @click="srarch()">搜索</el-button>
            </div>

            <el-table :data="tableData" height="250" border style="width: 100%">
                <el-table-column prop="id" label="日志编号" width="180" align="center"></el-table-column>
                <el-table-column prop="operation" label="操作" width="180" align="center"> </el-table-column>
                <el-table-column prop="tname" label="表名" align="center"></el-table-column>
                <el-table-column prop="opertor" label="操作人" align="center"></el-table-column>
                <el-table-column prop="time" label="操作时间" align="center"></el-table-column>
                <el-table-column fixed="right" label="" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                tname1: [
                    { name: 'user' },
                    { name: 'job' },
                    { name: 'systemuser' },
                    { name: 'tube' },
                    { name: 'tubeuser' },
                    { name: 'userinfo' },
                    { name: 'userRole' }
                ],
                tname: { name: '' },
                time: [],
                operation: ''
            }
        }, created() {
            this.getData()
        },
        methods: {
            getData() {
                this.$axios.post('/log/select', {
                    tname:this.tname.name,
                    time:this.time[0],
                    t1me1:this.time[1],
                    operation:this.operation
                }
                ).then(res => {
                    if (res.data.code == 1) {
                        this.tableData = res.data.data
                    }
                })
            },
            srarch() {

            },
            deleteRow(index, tableData) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        }
    }
</script>
<style>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 180px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>