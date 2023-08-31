export type WordData = {
  word: string
  phonetics: {
    text: string
    audio: string | null
  }
  meanings: WordMeaning[]
  sources: string[]
}

export interface WordDataResponse {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  license: License
  sourceUrls: string[]
}

export interface WordMeaning {
  partOfSpeech: string
  definitions: WordDataDefinition[]
  synonyms: string[]
}

interface WordDataDefinition {
  text: string
  example: string | undefined
}

export interface ErrorResponse {
  title: string
  message: string
  resolution: string
}

export type SelectedFont = 'Sans Serif' | 'Serif' | 'Mono'

interface License {
  name: string
  url: string
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: any[]
}

interface Definition {
  definition: string
  synonyms: any[]
  antonyms: any[]
  example?: string
}

interface Phonetic {
  text: string
  audio: string
  sourceUrl?: string
  license?: License
}
