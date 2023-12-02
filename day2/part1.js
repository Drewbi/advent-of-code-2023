const fs = require('node:fs');

const lines = fs.readFileSync('./input.txt').toString().split('\n').filter(line => line.length > 0)
const gameResults = lines.map(line => {
    const [idText, dataText] = line.split(':')
    const id = Number(idText.match(/Game (\d+)/)[1])
    const rounds = dataText.split(';').map(roundText => {
        const colourData = roundText.split(',').map(colour => {
            const match = colour.match(/(?<number>\d+) (?<colour>\D+)/)
            return {
                colour: match.groups.colour,
                number: Number(match.groups.number)
            }
        })
        return colourData
    })

    return {
        id,
        rounds
    }
})

const maxColours = {
    red: 12,
    green: 13,
    blue: 14,
}

const validGames = gameResults.filter(game => {
    return !game.rounds.some(round => round.some(colourData => {
        return colourData.number > maxColours[colourData.colour]
    }))
})

console.log(`Valid games: ${validGames.length}/${gameResults.length}`)
console.log('Sum of IDs: ' + validGames.reduce((acc, currGame) => acc + currGame.id, 0))