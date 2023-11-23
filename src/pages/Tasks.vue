<template>
    <TaskList 
        :selectedOption="selectedOption" 
        :searchQuery="searchQuery" 
    />
</template>

<script setup>
import TaskList from '../components/tasks/TaskList.vue';

defineProps({
    selectedOption: {
        type: String,
    },
    searchQuery: {
        type: String
    }
})

</script>