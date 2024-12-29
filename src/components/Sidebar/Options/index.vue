<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '../../../store'
import { BackgroundTypes } from '../../../types'
import Fragment from '../../Fragment.vue'
import ColorInput from './ColorInput.vue'
import RangeInput from './RangeInput.vue'
import SelectInput from './SelectInput.vue'
import TextInput from './TextInput.vue'
import ToggleInput from './ToggleInput.vue'

const store = useStore()
const storeRef = storeToRefs(store)
</script>

<template>
  <div class="options-list">
    <Fragment>
      <div class="separator" aria-hidden />
      <TextInput
        label="Title"
        property="title"
        @handle-change="store.changeTitle"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <ToggleInput
        label="Show Titles"
        property="showTitles"
        @handle-change="store.toggleTitles"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <RangeInput
        label="Width"
        property="chartWidth"
        :min="1"
        :max="12"
        :value="storeRef.chart.value.size.x"
        :data-list-step-interval="1"
        @handle-change="store.setWidth"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <RangeInput
        label="Height"
        property="chartHeight"
        :min="1"
        :max="12"
        :value="storeRef.chart.value.size.y"
        :data-list-step-interval="1"
        @handle-change="store.setHeight"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <SelectInput
        label="Background Type"
        property="backgroundType"
        :options="['color', 'image']"
        :value="storeRef.chart.value.backgroundType"
        @handle-change="store.setBackgroundType"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment v-if="storeRef.chart.value.backgroundType === BackgroundTypes.Color">
      <ColorInput
        label="Background Color"
        property="backgroundColor"
        @handle-change="store.setBackgroundColor"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment v-if="storeRef.chart.value.backgroundType === BackgroundTypes.Image">
      <TextInput
        label="Background URL"
        property="backgroundUrl"
        @handle-change="store.setBackgroundUrl"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <RangeInput
        label="Gap"
        property="gap"
        :max="150"
        :min="0"
        @handle-change="store.changeGap"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <ToggleInput
        label="Show Numbers"
        property="showNumbers"
        @handle-change="store.toggleNumbers"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <ToggleInput
        label="Show Shadows"
        property="shadows"
        @handle-change="store.toggleShadows"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <ToggleInput
        label="Round Corners"
        property="roundCorners"
        @handle-change="store.toggleRoundedCorners"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <TextInput
        label="Font"
        property="font"
        @handle-change="store.changeFont"
      />
      <div class="separator" aria-hidden />
    </Fragment>
    <Fragment>
      <ColorInput
        label="Text Color"
        property="textColor"
        :value="storeRef.chart.value.textColor"
        @handle-change="store.changeTextColor"
      />
    </Fragment>
  </div>
</template>

<style scoped>
.options-list {
  display: flex;
  flex-flow: column;
  gap: 10px;
}

.layout-settings {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 4px;
}

.layout-settings button {
  height: 80px;
  background: #393939;
  border: none;
  font-size: 0.8rem;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 6px;
  color: white;
}

.layout-settings .selected-layout {
  color: var(--accent);
  text-decoration: underline;
}

.layout-settings button:hover {
  cursor: pointer;
}

.layout-settings label {
  display: block;
}

.layout-settings button svg {
  height: 24px;
  width: 24px;
}

.separator {
  border-top: 1px solid rgba(60, 60, 60, 0.9);
  margin: 4px 0;
}
</style>
