<template>
    <div>
        <div v-for="column in list" :key="column.id">
            <img :src="column.avatar" :alt="column.title">
            <h5>{{ column.title }}</h5>
            <p>{{ column.description }}</p>
            <a href="#">进入专栏</a>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'

interface ColumnProps {
    id: number;
    title: string;
    avatar: string;
    description: string;
}

// eslint-disable-next-line no-undef
const props = defineProps({
    list: {
        type: Array as PropType<ColumnProps[]>,
        required: true
    }
})
</script>