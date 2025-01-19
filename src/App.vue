<script setup lang="ts">
import ChartBuilder from './components/ChartBuilder/index.vue'
import LocalStorageWatcher from './components/LocalStorageWatcher.vue'
import Sidebar from './components/Sidebar/index.vue'
import './global.css'
</script>

<template>
  <LocalStorageWatcher>
    <div class="main">
      <Sidebar />
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
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 1fr;
}

* {
  box-sizing: border-box;
}

@media screen and (max-width: 1000px) {
  .main {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .main > div:first-child {
    order: 2
  }
}
</style>
