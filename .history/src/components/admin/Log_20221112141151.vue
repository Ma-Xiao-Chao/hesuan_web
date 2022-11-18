<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-data"></i> 试管管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            
        
        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="id" label="日志编号" width="180" align="center"></el-table-column>
            <el-table-column prop="operation" label="操作" width="180" align="center"> </el-table-column>
            <el-table-column prop="tname" label="表名" align="center"></el-table-column>
            <el-table-column prop="opertor" label="操作人" align="center"></el-table-column>
            <el-table-column prop="time" label="操作时间" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120" align="center">
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
                tableData: []
            }
        }, created() {
            this.getData()
        },
        methods: {
            getData() {
                this.$axios.post('/log/select', {
                }
                ).then(res => {
                    if (res.data.code == 1) {
                        this.tableData = res.data.data
                    }
                })
            }
        }
    }
</script>