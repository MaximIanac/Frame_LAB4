<template>
    <form @submit.prevent="createTodo">
        <div class="mb-5">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Todo</label>
            <textarea v-model="todoMessage" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
        <div class="block">
            <input 
                type="submit" 
                class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                value="Submit"
            />
        </div>
        <div class="h-16"></div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const todoMessage = ref('');

const emit = defineEmits(['create']);

const createTodo = () => {
    if (!todoMessage.value) {
        return
    }

    emit('create', todoMessage.value);
    todoMessage.value = '';
}

</script>