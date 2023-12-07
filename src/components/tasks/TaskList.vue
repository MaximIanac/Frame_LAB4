<template>
    <div>

    <ul v-if="!todoStore.isError" class="bg-white dark:bg-slate-800 shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
        <li 
            v-if="!todoStore.isLoading" 
            v-for="item in toDoList"
            :key="item.id"
        >
            <TaskBlock 
                :item="item"
            />
        </li>
        
        <li v-else>
            <Skeleton />
        </li>
    </ul>
    <div v-else @click="reload" class="absolute left-0 right-0 top-0 bottom-0 h-screen flex items-center justify-center m-auto cursor-pointer">
        <Error />
    </div>

    <div class="m-auto mt-10 w-[500px]">
        <AddTodoForm 
            @create="createTodo"
        />
    </div>
</div>

</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import TaskBlock from './TaskBlock.vue';
import Error from '../partials/alerts/Error.vue';
import Skeleton from '../partials/Skeleton.vue';
import { getToDoList } from '../../services/toDoRequests';
import AddTodoForm from '../partials/forms/AddTodoForm.vue';
import { useTodoStore } from '../../store/todoStore';

const props = defineProps({
    selectedOption: {
        type: String
    },

    searchQuery: {
        type: String
    }
})

const todoStore = useTodoStore();
const toDoList = computed(() => todoStore.toDoList)
let searchTimeout;

const createTodo = (todo) => {
    toDoList.value.push({
        todo: todo,
        completed: false
    })
}

const reload = () => {
    window.location.reload();
}

const sortedList = computed(() => {
    const sortingDirection = props.selectedOption === 'todo' ? 1 : -1;

    return [...toDoList.value].sort((item1, item2) => {
        return sortingDirection * item1.todo.localeCompare(item2.todo);
    });
});

const sortedListBySearch = computed(() => {
    const tempListForSearch = toDoList.value;

    if (props.searchQuery === '') {
        getList();
    }

    return tempListForSearch.filter(item => {
        return item.todo.toLowerCase().includes(props.searchQuery.toLowerCase());
    });
})

watch(() => props.selectedOption, () => {
    toDoList.value = sortedList.value;
})

watch(() => props.searchQuery, () => {
    isLoading.value = true;

    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
        isLoading.value = false;
        toDoList.value = sortedListBySearch.value;
    }, 1000);
})

onMounted(() => {
    todoStore.getList();
})
</script>