<template>
    <div>this is a column detail view</div>
    <pre>{{ route }}</pre>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();

</script>