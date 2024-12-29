<script setup lang="ts">
import type {
  BookResult,
  GameResult,
  MovieResult,
  MusicResult,
  Result,
  TVResult,
} from '../../../types'
import { createChartItem } from '../../../helpers/chart'
import { useStore } from '../../../store'
import {
  SearchTypes,
} from '../../../types'
import ResultItem from './ResultItem.vue'

interface Props {
  results: any[]
  resultsType: SearchTypes
  isLoading?: boolean
}

const props = defineProps<Props>()

const store = useStore()

// remove any without a cover and/or an author
function filterBooks(results: BookResult[]): BookResult[] {
  return results
    .filter(result => result.cover_edition_key)
    .filter(result => result.author_name)
}

// remove music without a cover image
function filterMusic(results: MusicResult[]): MusicResult[] {
  return results
    .filter((result) => {
      let coverFound = false
      result.image.forEach((image) => {
        if (image['#text'] !== '') {
          coverFound = true
        }
      })
      return coverFound
    })
}

// remove games without a cover image
function filterGames(results: GameResult[]): GameResult[] {
  return results.filter(result => result.cover)
}

function filterMovies(results: MovieResult[]): MovieResult[] {
  return results.filter(result => result.poster_path)
}

function filterTV(results: TVResult[]): TVResult[] {
  return results.filter(result => result.poster_path)
}

function addToChart(item: Result): void {
  // Get the index of the first null chart slot
  const firstEmptyIndex = store.chart.items.indexOf(null)

  const totalSlots = store.chart.size.x * store.chart.size.y

  // Only add an item if there's a visible slot
  if (firstEmptyIndex < totalSlots) {
    const newItem = createChartItem(item)
    store.addItem({ item: newItem, index: firstEmptyIndex })
    store.setPopup(`Added ${newItem.title}`)
  }
}

function initDrag(event: DragEvent, result: Result): void {
  const dragData = JSON.stringify({
    item: createChartItem(result),
  })

  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', dragData)
  }
}
</script>

<template>
  <div id="results-div">
    <ul v-if="resultsType === SearchTypes.Books">
      <li
        v-for="(result, index) in filterBooks(results)"
        :key="index"
      >
        <ResultItem
          :image-data="{ src: `https://covers.openlibrary.org/b/olid/${result.cover_edition_key}-L.jpg`, alt: result.title }"
          draggable="true"
          @click="addToChart(result)"
          @dragstart="(event) => initDrag(event, result)"
        />
      </li>
    </ul>
    <ul v-else-if="resultsType === SearchTypes.Music">
      <li
        v-for="(result, index) in filterMusic(results)"
        :key="index"
      >
        <ResultItem
          :image-data="{ src: result.image[result.image.length - 1]['#text'], alt: result.name }"
          draggable="true"
          @click="addToChart(result)"
          @dragstart="(event) => initDrag(event, result)"
        />
      </li>
    </ul>
    <ul v-else-if="resultsType === SearchTypes.Games">
      <li
        v-for="(result, index) in filterGames(results)"
        :key="index"
      >
        <ResultItem
          :image-data="{ src: result.cover, alt: result.name }"
          draggable="true"
          @click="addToChart(result)"
          @dragstart="(event) => initDrag(event, result)"
        />
      </li>
    </ul>
    <ul v-else-if="resultsType === SearchTypes.Movies">
      <li
        v-for="(result, index) in filterMovies(results)"
        :key="index"
      >
        <ResultItem
          :image-data="{ src: `https://image.tmdb.org/t/p/w185/${result.poster_path}`, alt: result.title }"
          draggable="true"
          @click="addToChart(result)"
          @dragstart="(event) => initDrag(event, result)"
        />
      </li>
    </ul>
    <ul v-else-if="resultsType === SearchTypes.Shows">
      <li
        v-for="(result, index) in filterTV(results)"
        :key="index"
      >
        <ResultItem
          :image-data="{ src: `https://image.tmdb.org/t/p/w185/${result.poster_path}`, alt: result.name }"
          draggable="true"
          @click="addToChart(result)"
          @dragstart="(event) => initDrag(event, result)"
        />
      </li>
    </ul>
    <ul
      v-else-if="resultsType === SearchTypes.Custom"
      class="single-result-list"
    >
      <li>
        <ResultItem
          :image-data="{ src: results[0].imageURL, alt: results[0].title }"
          draggable="true"
          class="centered-item"
          @click="addToChart(results[0])"
          @dragstart="(event) => initDrag(event, results[0])"
        />
      </li>
      <p>Click or drag to add this item to the chart.</p>
    </ul>
    <div v-else>
      <p>Search for {{ props.resultsType }} has not been implemented yet.</p>
    </div>
  </div>
</template>

<style scoped>
#results-div {
  margin: 0 10px;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, 70px);
  align-items: center;
  justify-content: space-evenly;
  gap: 4px;
  padding: 0px;
}

li {
  list-style-type: none;
}

li img {
  width: 100%;
}

li img:hover {
  cursor: pointer;
}

#empty-results-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
}

.single-result-list {
  display: initial;
}

.single-result-list li {
  margin: auto;
  max-width: 90px;
}

.single-result-list p {
  text-align: center;
}
</style>
