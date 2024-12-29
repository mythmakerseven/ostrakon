<script setup lang="ts">
import type { Ref } from 'vue'
import type { Result } from '../../../types'
import { onMounted, ref } from 'vue'
import { isValidSearchType } from '../../../helpers/typeGuards'
import { SearchTypes } from '../../../types'
import SearchDropdown from './SearchDropdown.vue'
import SearchForm from './SearchForm.vue'
import SearchTypePicker from './SearchTypePicker.vue'

const searchType: Ref<SearchTypes> = ref(SearchTypes.Music)
const results: Ref<Result[]> = ref([])

function setSearchType(value: SearchTypes) {
  results.value = []
  searchType.value = value
  localStorage.setItem('activeTab', value)
}

function getInitialSearchType() {
  const storedValue = localStorage.getItem('activeTab')
  if (storedValue && isValidSearchType(storedValue)) {
    setSearchType(storedValue)
  }
}

onMounted(() => {
  getInitialSearchType()
})

function updateResults(newResults: []) {
  results.value = newResults
}
</script>

<template>
  <div id="searchbox">
    <div class="container">
      <SearchTypePicker
        :current-type="searchType"
        @set-search-type="setSearchType"
      />
      <SearchForm
        :search-type="searchType"
        @update-results="updateResults"
      />
      <SearchDropdown
        v-if="results.length > 0"
        :results="results"
        :results-type="searchType"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
