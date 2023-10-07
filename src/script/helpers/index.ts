import { Matrix2D } from '../types'

export function cloneMatrix2D(matrix: Matrix2D) {
  return JSON.parse(JSON.stringify(matrix))
}

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function createMatrix2D(width: number, height: number): Matrix2D {
  const matrix2D = []
  for (let y = 0; y < height; y++) {
    const row = Array(width).fill(0)
    matrix2D.push(row)
  }
  return matrix2D
}
