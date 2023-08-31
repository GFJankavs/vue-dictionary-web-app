<template>
  <div class="body" :class="{ darkMode: isDarkMode }">
    <div class="container">
      <div class="wrapper">
        <DictionaryHeader />
        <SearchInput :loading="fetchingData" />
        <SearchLoader v-if="fetchingData" />
        <SearchResult v-if="wordData && !fetchingData && !error" :word="wordData" />
        <SearchError v-if="error" :error="error" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DictionaryHeader from './components/Header/DictionaryHeader.vue'
import SearchInput from './components/SearchInput.vue'
import SearchLoader from './components/SearchLoader.vue'
import SearchResult from './components/SearchResult/SearchResult.vue'
import SearchError from './components/SearchError.vue'
import { useWordStore } from './stores/word'
import { mapActions, mapWritableState } from 'pinia'
import { useDictionaryStore } from './stores/dictionary'

export default defineComponent({
  computed: {
    ...mapWritableState(useWordStore, ['wordData', 'fetchingData', 'error']),
    ...mapWritableState(useDictionaryStore, ['selectedFont', 'isDarkMode'])
  },
  components: {
    DictionaryHeader,
    SearchInput,
    SearchLoader,
    SearchResult,
    SearchError
  },
  methods: {
    ...mapActions(useDictionaryStore, ['updateDarkMode'])
  },
  beforeMount() {
    console.log('I got triggered');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.updateDarkMode(true);
    }
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  max-width: 736px;
  padding: 24px;
}

.wrapper {
  display: grid;
  gap: 52px;
}

.body {
  background-color: #fff;
}

.darkMode {
  background-color: #050505;
}
</style>
