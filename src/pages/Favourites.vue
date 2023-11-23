<template>
    <ul class="bg-white dark:bg-slate-800 shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
        <li 
            v-if="favItems.length > 0"
            v-for="item in favItems"
            :key="item.id"
        >
            <TaskBlock 
                :item="item"
            />
        </li>
    </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TaskBlock from '../components/tasks/TaskBlock.vue';

const favItems = ref([]);

onMounted(() => {
    const storedItems = localStorage.getItem('toDoList');
    if (storedItems) {
        favItems.value = JSON.parse(storedItems);
        console.log(favItems.value);
    }
})
</script>