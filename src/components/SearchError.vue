<template>
  <div class="error-grid">
    <i class="error-icon">😕</i>
    <div class="error-text-container">
      <span class="error-title" :class="{ dark: isDarkMode }">{{ error.title }}</span>
      <p class="error-text">{{ error.message + ' ' + error.resolution }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useDictionaryStore } from '@/stores/dictionary'
import type { ErrorResponse } from '@/types'
import { mapState } from 'pinia'
import { type PropType, defineComponent } from 'vue'
import getFontFamily from '@/helpers'

export default defineComponent({
  props: {
    error: {
      type: Object as PropType<ErrorResponse>,
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
.error-grid {
  display: grid;
  place-items: center;
  gap: 44px;
  margin-top: 132px;
}

.error-icon {
  color: #2d2d2d;
  font-family: Roboto;
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.error-text-container {
  display: grid;
  gap: 24px;
  text-align: center;
}

.error-title {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #2d2d2d;
}

.error-text {
  font-family: v-bind(getFontFamily(selectedFont, 'Regular'));
  color: #757575;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.dark {
  color: #fff;
}
</style>
