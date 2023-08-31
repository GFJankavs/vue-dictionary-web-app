<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected-container" :class="{ open: open }" @click="open = !open">
      <div
        class="selected"
        :class="{ dark: isDarkMode }"
        :style="{
          fontFamily: getFontFamily(selectedFont, 'Regular'),
          color: isDarkMode ? '#fff' : '#2d2d2d'
        }"
      >
        {{ selected }}
      </div>
      <img src="../../icons/icon-arrow-down.svg" alt="arrow" />
    </div>
    <div
      class="items"
      :class="{ selectHide: !open, dark: isDarkMode, darkBox: isDarkMode }"
      :style="{
        display: open ? 'grid' : 'none'
      }"
    >
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="handleOptionClick(option)"
        :style="{
          fontFamily: option.fontFamily
        }"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import getFontFamily from '@/helpers'
import { useDictionaryStore } from '@/stores/dictionary'
import { mapState } from 'pinia'
import { defineComponent } from 'vue'

interface FontOption {
  name: string
  fontFamily: string
}

export default defineComponent({
  props: {
    options: {
      type: Array<FontOption>,
      required: true
    },
    default: {
      type: String,
      required: false,
      default: null
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
      open: false
    }
  },
  computed: {
    ...mapState(useDictionaryStore, ['isDarkMode', 'selectedFont'])
  },
  mounted() {
    this.$emit('input', this.selected)
  },
  methods: {
    handleOptionClick(option: FontOption) {
      this.selected = option.name
      this.open = false
      this.$emit('input', option)
    },
    getFontFamily
  }
})
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  min-width: 183px;
  text-align: left;
  outline: none;
  height: 24px;
  line-height: 24px;
  display: grid;
  justify-items: flex-end;
}

.custom-select .selected {
  background-color: transparent;
  border-radius: 6px;
  color: #2d2d2d;
  height: 24px;
  user-select: none;
  font-family: 'InterBold', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  white-space: nowrap;
}

.selected-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  cursor: pointer;
  width: 124px;
}

.selected-container img {
  padding: 0;
}

.custom-select .items {
  margin-top: 16px;
  border-radius: 16px;
  width: 100%;
  min-width: 183px;
  padding: 24px;
  overflow: hidden;
  box-shadow: 0px 5px 30px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
  min-height: 152px;
  display: grid;
  gap: 16px;
}

.custom-select .items div {
  color: #2d2d2d;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  color: #a445ed;
}

.selectHide {
  display: none;
}

.items {
  background-color: #fff;
  box-shadow: 0px 5px 30px 0px rgba(0, 0, 0, 0.1);
}

.dark {
  color: #ffffff;
}

.items.dark div {
  color: #fff;
}

.items.darkBox {
  background-color: #1f1f1f;
  box-shadow: 0px 5px 30px 0px #a445ed;
}
</style>
