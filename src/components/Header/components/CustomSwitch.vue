<template>
  <label class="switch">
    <input type="checkbox" :checked="isDarkMode" @input="onSwitchClick(!isDarkMode)" />
    <span class="slider round" :class="{ dark: isDarkMode }"></span>
  </label>
</template>

<script lang="ts">
import { useDictionaryStore } from '@/stores/dictionary'
import { mapActions, mapWritableState } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    ...mapWritableState(useDictionaryStore, ['isDarkMode'])
  },
  methods: {
    ...mapActions(useDictionaryStore, ['updateDarkMode']),
    onSwitchClick(value: boolean) {
      this.updateDarkMode(value)
    }
  }
})
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #757575;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:hover {
  background-color: #a445ed;
}

.slider:before {
  position: absolute;
  content: '';
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider:before {
  -webkit-transform: translateX(18px);
  -ms-transform: translateX(18px);
  transform: translateX(18px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 10px;
}

.slider.round:before {
  border-radius: 50%;
}

.dark {
  background-color: #a445ed;
}
</style>
