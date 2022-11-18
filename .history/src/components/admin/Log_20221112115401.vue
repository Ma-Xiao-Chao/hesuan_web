<template>
    <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column prop="id" label="日志编号" width="180">
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
        </el-table-column>
        <el-table-column prop="tname" label="表名">
        </el-table-column>
    </el-table>
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