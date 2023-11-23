<template>
    <ul v-if="!isError" class="bg-white dark:bg-slate-800 shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
        <li v-if="!isLoading">
            <div class="px-4 py-5 sm:px-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">Todo</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400"> {{ toDo.todo }}</p>
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Status: 
                        <span v-if="toDo.completed" class="text-green-400">Completed</span>
                        <span v-else class="text-red-400">Incompleted</span>
                    </p>
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                </div>
            </div>

            <div class="flex justify-center w-full group">
                <button @click="$router.go(-1)" class="bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 group-hover:animate-bounce rounded-xl p-3">Back</button>
            </div>
        </li>

        <li v-else>
            <SkeletonItem />
        </li>
    </ul>

    <div v-else class="absolute left-0 right-0 top-0 bottom-0 h-screen flex items-center justify-center m-auto cursor-pointer">
        <Error @click="reload"/>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import SkeletonItem from '../components/partials/SkeletonItem.vue';
import { getSingleToDo } from '../services/toDoRequests';
import Error from '../components/partials/alerts/Error.vue';

const route = useRoute();
const toDo = ref([]);
const isLoading = ref(true);
const isError = ref(false);

const getTodo = async (id) => {
    try {
        isLoading.value = true;
        const res = await getSingleToDo(id);
        toDo.value = res;
        isLoading.value = false;
    } catch(e) {
        isError.value = true;
        console.log(e);
    }
}

const reload = () => {
    window.location.reload();
}

onMounted(() => {
    getTodo(route.params.id);
})


</script>