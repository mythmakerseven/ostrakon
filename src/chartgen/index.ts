import type { Chart } from '../types'
import {
  buildTitles,
  drawBackground,
  drawTitle,
  insertCoverImages,
  insertTitles,
  setup,
} from './lib'

function generateChart(canvas: HTMLCanvasElement, chart: Chart, cellSize = 260): HTMLCanvasElement {
  const canvasInfo = setup(canvas, chart, cellSize)

  drawBackground(canvasInfo, chart)

  // Default bahavior is to not include shadows, so we won't use them if chart.shadows is undefined.
  if (chart.shadows === true) {
    canvasInfo.ctx.shadowOffsetX = 2
    canvasInfo.ctx.shadowOffsetY = 2
    canvasInfo.ctx.shadowBlur = 4
    canvasInfo.ctx.shadowColor = 'rgba(0,0,0,0.6)'
  }

  // Set up the request text color--default is white.
  if (chart.textColor && /^#[0-9A-F]{6}$/i.test(chart.textColor)) {
    canvasInfo.ctx.fillStyle = chart.textColor
  }
  else {
    canvasInfo.ctx.fillStyle = 'white'
  }

  // Draw the title at the top
  if (chart.title !== '') {
    drawTitle(canvasInfo, chart)
  }

  insertCoverImages(
    chart,
    canvasInfo,
  )

  if (chart.showTitles) {
    buildTitles(chart)

    insertTitles(
      canvasInfo,
      chart,
      canvasInfo.titles,
    )
  }

  return canvas
}

export default generateChart
