const fs = require('node:fs');

const [timeText, distanceText] = fs.readFileSync('./input.txt').toString().split('\n').filter(text => text !== '')
const matchedTime = timeText.match(/\d+/g)
const matchedDistance = distanceText.match(/\d+/g) 
const records = matchedTime.map((time, i) => ({ time: Number(time), distance: Number(matchedDistance[i])}))

const raceOptions = records.map(race => {
    let winOptions = 0
    let holdTime = 0
    while(holdTime < race.time) {
        if (getRaceDistance(holdTime, race.time) > race.distance) winOptions++
        holdTime++
    }
    return winOptions
})

function getRaceDistance(holdTime, raceLength) {
    return (raceLength - holdTime) * holdTime 
}

const marginOfError = raceOptions.reduce((acc, curr) => acc * curr)

console.log(marginOfError)