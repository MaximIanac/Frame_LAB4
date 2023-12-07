import { defineStore } from 'pinia';
import { getSingleToDo, getToDoList } from '../services/toDoRequests';

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        toDoList: [],
        isLoadingList: true,
        isErrirList: false,

        toDo: [],
        isLoading: true,
        isError: false
    }),
    getters: {
        
    },
    actions: {
        async getList() {
            try {
                this.isLoading = true;
                const res = await getToDoList();
                this.toDoList = res;
                this.isLoading = false;
            } catch(e) {
                this.isError = true;
                console.log(e);
            }
        },

        async getTodo(id) {
            try {
                this.isLoading = true;
                const res = await getSingleToDo(id);
                this.toDo = res;
                this.isLoading = false;
            } catch(e) {
                this.isError = true;
                console.log(e);
            }
        }
    },
});
