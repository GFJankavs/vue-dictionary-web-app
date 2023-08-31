<template>
  <div class="input-wrapper">
    <form
      class="input-container"
      @submit.prevent="fetchWord"
      :style="[
        inputError.length > 0 ? { border: '1px solid red' } : { border: '1px solid transparent' }
      ]"
      :class="{ dark: isDarkMode }"
    >
      <input
        type="text"
        class="input"
        autofocus
        v-model="input"
        placeholder="Search for any word…"
      />
      <img src="./icons/icon-search.svg" alt="Search" @click="fetchWord" />
    </form>
    <span class="input-error" v-if="inputError.length > 0">{{ inputError }}</span>
  </div>
</template>

<script lang="ts">
import getFontFamily from '@/helpers'
import { useDictionaryStore } from '@/stores/dictionary'
import { useWordStore } from '@/stores/word'
import type { WordDataResponse, ErrorResponse, WordData } from '@/types'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'

const api = 'https://api.dictionaryapi.dev/api/v2/entries/en'

export default defineComponent({
  data() {
    return {
      input: '',
      inputError: ''
    }
  },
  emits: ['loading'],
  computed: {
    ...mapState(useDictionaryStore, ['selectedFont', 'isDarkMode'])
  },
  methods: {
    ...mapActions(useWordStore, ['updateWordData', 'updateFetchingData', 'updateError']),
    async fetchWord() {
      if (this.input.length === 0) {
        this.inputError = "Whoops, can't be empty..."
        return
      }
      this.inputError = ''
      this.updateError(null)
      this.updateFetchingData(true)
      const response = await fetch(`${api}/${this.input}`)
      const data: WordDataResponse[] | ErrorResponse = await response.json()
      console.log(data)

      if (!Array.isArray(data)) {
        this.updateError({
          title: data.title,
          message: data.message,
          resolution: data.resolution
        })
      } else {
        const wordData: WordData = {
          word: data[0].word,
          phonetics: {
            text: data[0].phonetic,
            audio: data[0].phonetics.find((phonetic) => phonetic.audio.length > 0)?.audio ?? null
          },
          meanings: data[0].meanings.map((meaning) => {
            return {
              partOfSpeech: meaning.partOfSpeech,
              definitions: meaning.definitions.map((value) => ({
                text: value.definition,
                example: value.example
              })),
              synonyms: meaning.synonyms ?? []
            }
          }),
          sources: data[0].sourceUrls
        }
        this.updateWordData(wordData)
      }
      this.updateFetchingData(false)
    },
    getFontFamily
  }
})
</script>

<style scoped>
.input-wrapper {
  display: grid;
  gap: 8px;
}

.input-container {
  width: 100%;
  padding: 20px 24px;
  border: 1px solid transparent;
  border-radius: 16px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
}

.input-container input {
  color: #2d2d2d;
}

.input-container.dark {
  background-color: #1f1f1f;
}

.input-container.dark input {
  color: #fff;
}

.input-container:has(input:active) {
  border: 1px solid #a445ed;
}

.input {
  all: unset;
  width: 100%;
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.input::placeholder {
  opacity: 0.25;
}

.input-container.dark input::placeholder {
  color: #fff;
}

.input-container img {
  cursor: pointer;
}

.input-error {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #ff5252;
}
</style>
