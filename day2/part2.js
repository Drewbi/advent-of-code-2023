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

const maxResults = gameResults.map(game => game.rounds.reduce((acc, curr) => {
    curr.forEach(entry => {
        if(acc[entry.colour] < entry.number) acc[entry.colour] = entry.number
    })
    return acc
}, {
    red: 1,
    blue: 1,
    green: 1
}))

const powerSum = maxResults.map(result => {
    return result.blue * result.green * result.red
}).reduce((curr, acc) => curr + acc, 0)

console.log('Power sum: ' + powerSum)