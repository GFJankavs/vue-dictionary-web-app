<template>
  <div class="header">
    <img src="../icons/logo.svg" alt="Dictionary Logo" />
    <div class="header__right">
      <FontSelect
        :options="[
          {
            name: 'Sans Serif',
            fontFamily: 'InterBold'
          },
          {
            name: 'Serif',
            fontFamily: 'LoraBold'
          },
          {
            name: 'Mono',
            fontFamily: 'InconsolataBold'
          }
        ]"
        :default="'Sans Serif'"
        class="select"
        @input="updateSelectedFont($event.name)"
      />
      <div class="divider" />
      <div class="header__buttons">
        <custom-switch />
        <!-- <img src="../icons/icon-moon.svg" alt="Dark Mode"> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          class="moon"
          :class="{ dark: isDarkMode }"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 10.449C0.998458 12.8283 1.80169 15.1383 3.27914 17.0033C4.75659 18.8683 6.82139 20.1788 9.13799 20.7218C11.4545 21.2647 13.8866 21.0082 16.039 19.994C18.1912 18.9797 19.9373 17.2673 20.9931 15.1352C11.5442 15.1352 6.85799 10.4479 6.85799 1C5.09842 1.87311 3.61767 3.22033 2.58266 4.88981C1.54765 6.5593 0.999502 8.48469 1 10.449Z"
            stroke="#757575"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FontSelect from './components/FontSelect.vue'
import CustomSwitch from './components/CustomSwitch.vue'
import { mapActions, mapState } from 'pinia'
import { useDictionaryStore } from '@/stores/dictionary'

export default defineComponent({
  components: {
    FontSelect,
    CustomSwitch
  },
  methods: {
    ...mapActions(useDictionaryStore, ['updateSelectedFont']),
    displayToKey(display: string) {
      return display.toLowerCase().replace(' ', '-')
    }
  },
  computed: {
    ...mapState(useDictionaryStore, ['isDarkMode'])
  }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 26px;
  flex-wrap: nowrap;
}

.divider {
  width: 1px;
  height: 32px;
  background-color: #e9e9e9;
}

.header__buttons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.moon path {
  stroke: #757575;
}

.moon.dark path {
  stroke: #a445ed;
}
</style>
