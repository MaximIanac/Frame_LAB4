<template>
  <div class="relative w-full min-h-screen h-full bg-slate-100 dark:bg-slate-500">
    <Header 
      @selected-emit="handleSelectedOption"
      @search-query="handleSearchQuery"
    />
    <div class="container m-auto">
      <router-view 
        :selectedOption="selectedOption"
        :searchQuery="searchQuery"
      >
      </router-view>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/header/Header.vue';
import Footer from './components/footer/Footer.vue';
import { ref } from 'vue';

const selectedOption = ref('');
const searchQuery = ref('');

const handleSelectedOption = (value) => {
  selectedOption.value = value;
}

const handleSearchQuery = (value) => {
  searchQuery.value = value;
}

</script>

