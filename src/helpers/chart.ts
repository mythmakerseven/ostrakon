// Functions for filling in the chart.

import type {
  Chart,
  ChartItem,
  Result,
} from '../types'
import { initialState, useStore } from '../store'
import { appendChart, getActiveChart, setActiveChart } from './localStorage'
import {
  isBookResult,
  isCustomResult,
  isGameResult,
  isMovieResult,
  isMusicResult,
  isTVResult,
} from './typeGuards'

// Add the proper <img> elements into the chart state.
// This is needed when loading a saved chart from localstorage.
export function addImgElements(chart: Chart): Chart {
  const itemsWithCovers = chart.items.map((item) => {
    if (!item) {
      return null
    }

    const cover = new Image()

    cover.src = item.coverURL
    item.coverImg = cover

    return item
  })

  return {
    ...chart,
    items: itemsWithCovers,
  }
}

// To run the first time Topsters.org launches, or when we want to reset everything.
export function initializeFirstRun(): void {
  const newUuid = appendChart({
    timestamp: new Date().getTime(),
    data: initialState.chart,
  })

  setActiveChart(newUuid)
}

export function setImage(url: string): HTMLImageElement {
  const cover = new Image()
  cover.src = url
  return cover
}

export function createChartItem(item: Result): ChartItem {
  if (isBookResult(item)) {
    return {
      title: item.title,
      coverImg: setImage(
        `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-L.jpg`,
      ),
      coverURL: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-L.jpg`,
      creator: item.author_name[0],
    }
  }
  else if (isMusicResult(item)) {
    const largestImageIndex = item.image.length - 1
    return {
      title: item.name,
      coverImg: setImage(item.image[largestImageIndex]['#text']),
      coverURL: item.image[largestImageIndex]['#text'],
      creator: item.artist,
    }
  }
  else if (isGameResult(item)) {
    return {
      title: item.name,
      coverImg: setImage(item.cover),
      coverURL: item.cover,
    }
  }
  else if (isMovieResult(item)) {
    return {
      title: item.title,
      coverImg: setImage(`https://image.tmdb.org/t/p/w185/${item.poster_path}`),
      coverURL: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
    }
  }
  else if (isTVResult(item)) {
    return {
      title: item.name,
      coverImg: setImage(`https://image.tmdb.org/t/p/w185/${item.poster_path}`),
      coverURL: `https://image.tmdb.org/t/p/w185/${item.poster_path}`,
    }
  }
  else if (isCustomResult(item)) {
    return {
      title: item.title,
      creator: item.creator,
      coverImg: setImage(item.imageURL),
      coverURL: item.imageURL,
    }
  }
  else {
    throw new Error('Invalid chart item')
  }
}

export async function downloadChart(): Promise<void> {
  const html2canvas = await import('html2canvas')
  const element = document.querySelector('#chart') as HTMLElement

  if (!element) {
    throw new Error('Chart not found! Something must have gone horribly wrong.')
  }

  // Remove the scale transform - otherwise, html2canvas
  // will download a degraded quality version of the chart.
  const onclone = (doc) => {
    const chart = doc.querySelector('#chart') as HTMLElement
    chart.style.transform = 'none'
  }

  const result = await html2canvas.default(element, {
    useCORS: true,
    onclone,
    proxy: `${import.meta.env.VITE_BACKEND_URL}/api/proxy`,
    backgroundColor: null,
  })

  const blob = await new Promise(resolve => result.toBlob(resolve)) as Blob
  const url = URL.createObjectURL(blob)
  saveChartImage(url)
}

// Saves the chart as an image
function saveChartImage(url: string): void {
  const link = document.createElement('a')
  link.download = 'chart.png'
  link.href = url
  link.rel = 'noopener'
  link.target = '_self'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function createNewChart() {
  const newUuid = appendChart({
    timestamp: new Date().getTime(),
    data: initialState.chart,
  })

  setActiveChart(newUuid)
}

// Forces the chart to re-render from localStorage.
// Useful in situations where we update the charts by
// modifying localStorage directly such as imports.
export function forceRefresh() {
  const store = useStore()

  const activeChart = getActiveChart()
  store.setEntireChart(activeChart.data)
}

export const periodHeaders = {
  'overall': 'All-Time',
  '7day': 'Weekly',
  '1month': 'Monthly',
  '3month': '3 Month',
  '6month': '6 Month',
  '12month': 'Yearly',
}
