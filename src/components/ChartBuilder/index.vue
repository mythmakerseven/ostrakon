<script setup lang="ts">
import Chart from './Chart/index.vue'
import TopBar from './TopBar.vue'
</script>

<template>
  <div class="chart-builder">
    <div class="chart-builder-contents">
      <TopBar />
      <Chart />
    </div>
  </div>
</template>

<style scoped>
.chart-builder {
  margin: 0;
  text-align: center;
  padding: 0;
}

.chart-builder-contents {
  margin: 0 auto;
  padding: 0;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
}

@media screen and (max-width: 1000px) {
  .chart-builder {
    width: 100%;
    height: 50dvh;
    max-height: 50dvh;
    overflow-y: auto;
  }

  .chart-builder-contents {
    max-height: unset;
    position: relative;
  }
}
</style>
