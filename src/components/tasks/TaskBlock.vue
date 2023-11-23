<template>
    <div class="px-4 py-5 sm:px-6">
        <router-link class="cursor-pointer" :to="`/tasks/${item.id}`">
            <div class="flex items-center justify-between">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">Todo</h3>
                <p class="mt-1 ml-4 max-w-2xl text-sm text-gray-500 dark:text-gray-400"> {{ item.todo }}</p>
            </div>
        </router-link>
        
        <div class="mt-4 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status: 
                <span v-if="item.completed" class="text-green-400">Completed</span>
                <span v-else class="text-red-400">Incompleted</span>
            </p>
            <div @click="putTodoToLocalStorage" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path class=" cursor-pointer stroke-gray-700 dark:stroke-gray-300" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
            </div>
            
        </div>
    </div>
    
    <transition name="fade">
      <div v-if="isShowAlert" class="fixed bottom-10 right-10 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <span class="font-medium">Info alert!</span> Todo is successfully added.
      </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';

const isShowAlert = ref(false);

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const putTodoToLocalStorage = () => {
    let toDoList = JSON.parse(localStorage.getItem('toDoList')) || []; 

    let isElementExist = toDoList.findIndex(item => item.id === props.item.id); 

    if (isElementExist !== -1) {
        toDoList.splice(isElementExist, 1);
    } else {
        toDoList.push(props.item); 
        isShowAlert.value = true;
        setTimeout(() => {
            isShowAlert.value = false
        }, 5000)
    }

    localStorage.setItem('toDoList', JSON.stringify(toDoList)); 
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s; 
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>