const fs = require('node:fs');

const lines = fs.readFileSync('./input.txt').toString().split('\n')

const parts = lines.flatMap((line, index) => {
  const matches = [...line.matchAll(/[^.\d]/g)]
  return matches.map(match => ({
    type: match[0],
    location: { x: match.index, y: index }}))
})

const nameMap = lines.reduce((acc, line, index) => {
  const matches = [...line.matchAll(/\d+/g)]
  matches.forEach(match => {
    for(let i = 0; i < match[0].length; i++) {
      for(let j = -1; j < 2; j++) {
        for(let k = -1; k < 2; k++) {
          if (acc[match.index + i + j] === undefined) acc[match.index + i + j] = {}
          if (acc[match.index + i + j][index + k] === undefined) acc[match.index + i + j][index + k] = new Set()
          acc[match.index + i + j][index + k].add(Number(match[0]))
        }
      }
    }
  })
  return acc
}, {})

const validPartNumbers = parts.flatMap(part => {
  const values = [...nameMap[part.location.x][part.location.y].values()]
  if (part.type === '*' && values.length === 2) return values[0] * values[1]
  return []
})

console.log(validPartNumbers.reduce((curr, acc) => acc + curr, 0))
