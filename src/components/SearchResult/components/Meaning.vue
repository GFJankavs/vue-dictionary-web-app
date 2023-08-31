<template>
  <div class="meaning-top">
    <span class="meaning-text" :class="{ dark: isDarkMode }">
      {{ meaning?.partOfSpeech }}
    </span>
    <div class="meaning-top-divider" />
  </div>
  <div class="meaning-content">
    <span class="meaning-label">Meaning</span>
    <ul>
      <li
        v-for="definition in meaning.definitions"
        :key="definition.text"
        class="meaning-list-item"
      >
        <div class="meaning-item">
          <p :class="{ dark: isDarkMode }">{{ definition.text }}</p>
          <p v-if="definition.example" class="meaning-item-example">"{{ definition.example }}"</p>
        </div>
      </li>
    </ul>
  </div>
  <div class="synonyms" v-if="meaning.synonyms && meaning?.synonyms.length > 0">
    <span class="meaning-label">Synonyms</span>
    <div class="synonyms-list">{{ meaning.synonyms.join(', ') }}</div>
  </div>
  <div class="meaning-top-divider" v-if="index + 1 === total" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { WordMeaning } from '@/types'
import getFontFamily from '../../../helpers'

import { mapState } from 'pinia'
import { useDictionaryStore } from '@/stores/dictionary'

export default defineComponent({
  name: 'WordMeaning',
  props: {
    meaning: {
      type: Object as PropType<WordMeaning>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(useDictionaryStore, ['selectedFont', 'isDarkMode'])
  },
  methods: {
    getFontFamily
  }
})
</script>

<style scoped>
.meaning-top {
  display: flex;
  align-items: center;
  gap: 32px;
}

.meaning-top-divider {
  width: 100%;
  height: 1px;
  background-color: #e9e9e9;
}

.meaning-content {
  display: grid;
  gap: 27px;
}

.synonyms {
  display: flex;
  align-items: center;
  gap: 40px;
}

.meaning-text {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.meaning-label {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #757575;
}

ul li {
  padding-left: 20px;
}

ul li::marker {
  color: #8f19e8;
}

.meaning-list-item {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

ul,
.meaning-item {
  display: grid;
  gap: 13px;
}

.meaning-item-text {
  color: #2d2d2d;
}

.meaning-item-example {
  color: #757575;
}

.synonyms-list {
  font-family: v-bind(getFontFamily(selectedFont, 'Bold'));
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #8f19e8;
}
</style>
