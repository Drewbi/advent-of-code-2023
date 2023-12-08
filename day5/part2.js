const fs = require('node:fs');

const [seedsText, ...mapsText] = fs.readFileSync('./input.txt').toString().split('\n\n')

const mapsList = mapsText.map(mapTypeText => {
    const mapData = mapTypeText.split('\n').slice(1).filter(mapRangeText => mapRangeText !== '').map(mapRangeText => mapRangeText.split(' '))
    return mapData.map(range => ({
        start: Number(range[1]),
        end: Number(range[1]) + Number(range[2]) - 1,
        difference: Number(range[0]) - Number(range[1])
    }))
})

const seedsData = seedsText.split(':')[1].split(' ').filter(text => text != '').map(seed => Number(seed)).reduce((acc, curr, i, arr) => {
    if((i + 1) % 2 === 0) acc.push({
        start: arr[i-1],
        end: arr[i-1] + arr[i] - 1
    })
    return acc
}, [])

function splitMapRanges(range, mapType) {
    const newRanges = []
    const addRanges = (start, mid, end, maps) => {
        newRanges.push(
            ...splitMapRanges({
                start: start,
                end: mid - 1
            }, maps),
        )
        newRanges.push(
            ...splitMapRanges({
                start: mid,
                end: end,
            }, maps)
        )
    }
    
    for(let i = 0; i < mapType.length; i++) {
        if (range.start < mapType[i].start && range.end >= mapType[i].start) {
            addRanges(range.start, mapType[i].start, range.end, mapType)
            break
        }
        else if (range.start <= mapType[i].end && range.end > mapType[i].end) {
            addRanges(range.start, mapType[i].end + 1, range.end, mapType)
            break
        }
    }

    if (newRanges.length === 0) newRanges.push(range)
    return newRanges
}

function findCorrectMap(mapType, range) {
    return mapType.find(mapRange => {
        return range.start >= mapRange.start && range.end <= mapRange.end
    })
}

function applyMap(difference, range) {
    return {
        start: range.start + difference,
        end: range.end + difference
    }
}

function transformRanges(mapType, ranges) {
    return ranges.map(range => {
        const correctMap = findCorrectMap(mapType, range)
        if (correctMap) return applyMap(correctMap.difference, range)
        return range
    })
}

console.log('Starting seeds:')
console.log(seedsData)

const seedLocations = seedsData.map(seedRange => [seedRange]).flatMap(seedRange => {
    return mapsList.reduce(
        (mappedValue, mapType) => {
            const splitRanges = mappedValue.flatMap(inputRange => splitMapRanges(inputRange, mapType))
            return transformRanges(mapType, splitRanges)
        }, seedRange    
    )
})

// console.log('Seed Locations:')
// console.log(seedLocations)

const lowestLocation = seedLocations.reduce((acc, curr) => acc.start < curr.start ? acc : curr)
console.log('Lowest location:')
console.log(lowestLocation)

