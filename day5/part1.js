const fs = require('node:fs');

const [seedsText, ...mapsText] = fs.readFileSync('./input.txt').toString().split('\n\n')

const mapsList = mapsText.map(mapTypeText => {
    const mapData = mapTypeText.split('\n').slice(1).filter(mapRangeText => mapRangeText !== '').map(mapRangeText => mapRangeText.split(' '))
    return mapData.map(range => ({
        start: Number(range[1]),
        end: Number(range[1]) + Number(range[2]),
        difference: Number(range[0]) - Number(range[1])
    }))
})

const seedsData = seedsText.split(':')[1].split(' ').filter(text => text != '').map(seed => Number(seed))

const seedLocations = seedsData.map(seed => {
    return mapsList.reduce(
    (mappedValue, mapType) => {
        const correctMap = mapType.find(mapRange => {
            return mappedValue >= mapRange.start && mappedValue <= mapRange.end
        })
        if (correctMap) return mappedValue + correctMap.difference
        return mappedValue
    }, seed)
})

const lowestLocation = seedLocations.reduce((acc, curr) => Math.min(acc, curr))
console.log('Lowest location: ' + lowestLocation)