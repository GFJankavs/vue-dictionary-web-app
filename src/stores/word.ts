import { defineStore } from 'pinia'
import type { ErrorResponse, WordData } from '@/types'

interface WordDataState {
  wordData: WordData | null
  fetchingData: boolean
  error: {
    title: string
    message: string
    resolution: string
  } | null
}

export const useWordStore = defineStore('word', {
  state: (): WordDataState => ({
    wordData: null,
    fetchingData: false,
    error: null
  }),
  actions: {
    updateWordData(data: WordData) {
      console.log('Store action called', data)
      this.wordData = data
    },
    updateFetchingData(fetching: boolean) {
      this.fetchingData = fetching
    },
    updateError(error: ErrorResponse | null) {
      this.error = error
    }
  }
})
