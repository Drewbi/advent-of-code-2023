const fs = require('node:fs');

const lines = fs.readFileSync('./input.txt').toString().split('\n')

const winningNumbers = lines.map(line => {
    const [_, dataText] = line.split(':')
    const [ winningString, scratchedString ] = dataText.split('|');

    const numberRegex = /\d+/g
    const winningNumbers = new Set(winningString.match(numberRegex))
    const scratchedNumbers = new Set(scratchedString.match(numberRegex))

    return [...winningNumbers].filter(num => scratchedNumbers.has(num))
})

const calcCardCount = (cards) => {
    if (cards[0].length === 0) {
        return 1
    } 
    return cards.slice(1, cards[0].length + 1).reduce((acc, _, index) => {
        const result = calcCardCount(cards.slice(index + 1))
        return acc + result
    }, 1)
}

const numberOfCards = winningNumbers.reduce((acc, _, index, arr) => acc + calcCardCount(arr.slice(index)), 0)
console.log(`Total number of cards: ${numberOfCards}`)