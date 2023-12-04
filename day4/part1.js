const fs = require('node:fs');

const lines = fs.readFileSync('./input.txt').toString().split('\n')

const winningVal = lines.map(line => {
    const [idText, dataText] = line.split(':')
    const id = Number(idText.match(/\d+/)[0])
    const [ winningString, scratchedString ] = dataText.split('|');

    const numberRegex = /\d+/g
    const winningNumbers = new Set(winningString.match(numberRegex))
    const scratchedNumbers = new Set(scratchedString.match(numberRegex))

    return [...winningNumbers].filter(num => scratchedNumbers.has(num))
}).reduce((acc, curr) => {
    if (!curr.length) return acc
    return acc + Math.pow(2, curr.length - 1)
}, 0)

console.log(winningVal)