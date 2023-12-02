const fs = require('node:fs');

const lines = fs.readFileSync('./input.txt').toString().split('\n')

const numberRegex = /one|two|three|four|five|six|seven|eight|nine|[1-9]/g
const reverseNumberRegex = /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[1-9]/g

const numSpelling = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    eno: '1',
    owt: '2',
    eerht: '3',
    ruof: '4',
    evif: '5',
    xis: '6',
    neves: '7',
    thgie: '8',
    enin: '9'
}

const convertNumSpelling = (numString) => {
    if(/^[1-9]$/.test(numString)) return numString
    return numSpelling[numString]
}

const result = lines.reduce((acc, curr) => {
    const matches = curr.match(numberRegex)
    const revCurr = curr.split('').reverse().join('');
    console.log(revCurr)
    const revmatches = revCurr.match(reverseNumberRegex)
    const number = Number(
        convertNumSpelling(matches[0]) +
        convertNumSpelling(revmatches[0])
    )
    console.log(curr)
    console.log(matches)
    console.log(revmatches)
    console.log(number)
    return acc + number
}, 0)

console.log('Answer is: ' + result)