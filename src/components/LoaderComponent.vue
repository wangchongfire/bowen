<template>
    <Teleport to="#back">
        <el-table v-loading="loading" :data="tableData">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </Teleport>
</template>
<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'

const loading = ref(true)

const tableData = [
    {
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
]
const div = document.createElement('div');
div.id = 'back';
document.body.appendChild(div);
onUnmounted(() => {
    document.body.removeChild(div);
})

</script>
<style lang="scss" scoped>
.el-table {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: black;
    opacity: 0.6;
    top: 0;
}
</style>