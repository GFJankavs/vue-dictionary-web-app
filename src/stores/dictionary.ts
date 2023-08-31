import { defineStore } from 'pinia'

interface DictionaryState {
  selectedFont: 'Sans-Serif' | 'Serif' | 'Mono'
  isDarkMode: boolean
}

export const useDictionaryStore = defineStore('dictionary', {
  state: (): DictionaryState => ({
    selectedFont: 'Sans-Serif',
    isDarkMode: false
  }),
  actions: {
    updateSelectedFont(font: 'Sans-Serif' | 'Serif' | 'Mono') {
      this.selectedFont = font
    },
    updateDarkMode(isDarkMode: boolean) {
      this.isDarkMode = isDarkMode
    }
  }
})
