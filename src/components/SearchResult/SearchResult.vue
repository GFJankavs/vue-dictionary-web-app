<template>
  <div class="result-grid">
    <div class="result-top">
      <div class="result-top-text-wrapper">
        <h1 class="result-word" :class="{ dark: isDarkMode }">
          {{ word.word }}
        </h1>
        <span class="result-phonetic">
          {{ word.phonetics.text }}
        </span>
      </div>
      <button class="audio" v-if="word.phonetics.audio" @click="playAudio(word.phonetics.audio)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          viewBox="0 0 75 75"
          fill="none"
        >
          <circle opacity="0.25" cx="37.5" cy="37.5" r="37.5" fill="#A445ED" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29 27V48L50 37.5L29 27Z"
            fill="#A445ED"
          />
        </svg>
        <!-- <img src="../../components/icons/icon-play.svg" alt="Play audio" /> -->
      </button>
    </div>
    <WordMeaning
      v-for="meaning in word.meanings"
      :meaning="meaning"
      :key="meaning.partOfSpeech"
      :index="word.meanings.indexOf(meaning)"
      :total="word.meanings.length"
    />
    <div class="source-container">
      <span class="source-label"> Source </span>
      <a
        class="source-link-wrapper"
        v-for="source in word.sources"
        :href="source"
        target="_blank"
        :key="source"
      >
        <span class="source-link" :class="{ dark: isDarkMode }">{{ source }}</span>
        <img src="@/components/icons/icon-new-window.svg" alt="New Window" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import WordMeaning from './components/Meaning.vue'

import type { WordData } from '@/types'
import { mapState } from 'pinia'
import { useDictionaryStore } from '@/stores/dictionary'
import getFontFamily from '@/helpers'

export default defineComponent({
  props: {
    word: {
      type: Object as PropType<WordData> | undefined | null,
      default: null,
      required: true
    }
  },
  computed: {
    ...mapState(useDictionaryStore, ['selectedFont', 'isDarkMode'])
  },
  components: {
    WordMeaning
  },
  methods: {
    playAudio(url: string) {
      if (!this.word) return
      if (!this.word.phonetics.audio) return

      new Audio(url).play()
    },
    getFontFamily
  }
})
</script>

<style scopred>
.result-grid {
  display: grid;
  gap: 40px;
}

.result-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-word {
  font-family: v-bind(getFontFamily(selectedFont, 'Bold'));
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #2d2d2d;
}

.result-top-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.audio {
  all: unset;
  cursor: pointer;
  border-radius: 50%;
}

.audio:hover svg circle {
  fill: #a445ed;
  opacity: 1;
}

.audio:hover svg path {
  fill: white;
}

.result-phonetic {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #a445ed;
}

.source-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.source-label {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  color: #757575;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: default;
}

.source-link-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.source-link {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  color: #2d2d2d;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
}

.dark {
  color: #fff;
}
</style>
