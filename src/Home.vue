<script setup lang="ts">
import type { Ref } from 'vue'
import { BIconGearFill, BIconHouse, BIconPlusLg } from 'bootstrap-icons-vue'
import { ref } from 'vue'
import DownloadButton from './components/buttons/Download.vue'
import ChartBuilder from './components/ChartBuilder/index.vue'
import LocalStorageWatcher from './components/LocalStorageWatcher.vue'
import Popup from './components/Popup.vue'
import Sidebar from './components/Sidebar/index.vue'
import MobileOptionsSidebar from './components/Sidebar/MobileSidebar.vue'
import MobileSearchSidebar from './components/Sidebar/SearchBox/MobileSearch.vue'

const showMobileOptions: Ref<boolean> = ref(false)
const showMobileSearch: Ref<boolean> = ref(false)

const mainDivRef: Ref<HTMLFormElement> = ref(null)

function scrollToTop() {
  if (mainDivRef.value
    && !showMobileSearch.value
    && !showMobileOptions.value
  ) {
    mainDivRef.value.scrollTo(0, -1)
  }
}

function toggleMobileSearchDisplay() {
  showMobileOptions.value = false
  showMobileSearch.value = !showMobileSearch.value

  scrollToTop()
}

function toggleMobileOptionsDisplay() {
  showMobileSearch.value = false
  showMobileOptions.value = !showMobileOptions.value

  scrollToTop()
}

function returnToHomepage() {
  showMobileSearch.value = false
  showMobileOptions.value = false

  scrollToTop()
}
</script>

<template>
  <LocalStorageWatcher>
    <div ref="mainDivRef" class="main">
      <Sidebar />
      <button id="mobile-search-toggle" type="button" class="toggle-button" @click="toggleMobileSearchDisplay">
        <BIconPlusLg />
      </button>
      <button
        v-if="showMobileOptions || showMobileSearch"
        id="home-button"
        type="button"
        class="toggle-button"
        @click="returnToHomepage"
      >
        <BIconHouse />
      </button>
      <div
        v-if="!showMobileOptions && !showMobileSearch"
      >
        <DownloadButton />
      </div>
      <button id="mobile-options-toggle" type="button" class="toggle-button" @click="toggleMobileOptionsDisplay">
        <BIconGearFill />
      </button>
      <div class="mobile-options-visibility-manager" :class="showMobileOptions ? 'visible-mobile-options' : 'invisible-mobile-options'">
        <MobileOptionsSidebar />
      </div>
      <div class="mobile-search-visibility-manager" :class="showMobileSearch ? 'visible-mobile-search' : 'invisible-mobile-search'">
        <MobileSearchSidebar />
      </div>
      <Popup />
      <ChartBuilder />
    </div>
  </LocalStorageWatcher>
</template>

<style>
#app {
  font-family: "Nunito", sans-serif;
  color: var(--text-color);
  overflow: hidden;
  box-sizing: border-box;
  scrollbar-color: var(--accent) black;
  scrollbar-width: thin;
  accent-color: var(--accent);
}

h1, h2, h3, h4 {
  color: var(--accent);
}

body {
  background: #2a2a2a;
  touch-action: manipulation;
}

button {
  font-family: "Nunito", sans-serif;
}

input {
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  background-color: var(--input-bg);
  color: black;
}

select {
  border: none;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  padding: 4px;
  border-radius: 4px;
  color: black;
  accent-color: initial;
  appearance: none;
  background-color: var(--input-bg);
  background-image: url(/caret-down-fill.svg);
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: calc(100% - 6px);
  padding-right: 20px;
}

.main {
  height: 100dvh;
  max-height: 100dvh;
  width: 100vw;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
}

.toggle-button {
  display: none;
  border-radius: 50%;
  border: none;
  height: 50px;
  width: 50px;
  z-index: 10001;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

#mobile-search-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

#mobile-options-toggle {
  position: fixed;
  bottom: 20px;
  left: 20px;
}

#home-button {
  position: fixed;
  left: calc(50vw - 25px);
  bottom: 20px;
}

.toggle-button svg {
  transform: scale(2);
  margin: 0 auto;
  padding: 0;
  position: relative;
  top: 2px;
}

.toggle-button:hover {
  filter: brightness(90%);
  cursor: pointer;
}

* {
  box-sizing: border-box;
}

.mobile-options-visibility-manager {
  display: none;
}

.mobile-search-visibility-manager {
  display: none;
}

@media screen and (max-width: 1000px) {
  .main {
    flex-flow: column;
    overflow-x: hidden;
  }

  .toggle-button {
    display: initial;
    color: white;
  }

  .mobile-options-visibility-manager {
    display: initial;
    width: 100%;
    min-height: 100dvh;
    position: absolute;
    left: -100vw;
    padding: 0;
    margin: 0;
    background: var(--ui-bg);
    transition: 0.2s;
  }

  .mobile-search-visibility-manager {
    display: initial;
    width: 100%;
    min-height: 100dvh;
    position: absolute;
    right: -100vw;
    padding: 0;
    margin: 0;
    background: var(--ui-bg);
    transition: 0.2s;
  }

  .visible-mobile-options {
    display: initial;
    transform: translateX(100vw);
    z-index: 10000;
  }

  .invisible-mobile-options {
    transform: translateX(0vw);
    overflow: hidden;
  }

  .visible-mobile-search {
    display: initial;
    transform: translateX(-100vw);
    z-index: 10000;
  }

  .invisible-mobile-search {
    transform: translateX(0vw);
    overflow: hidden;
  }
}
</style>
