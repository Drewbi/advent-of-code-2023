const fs = require('node:fs');

const lines = fs.readFileSync('./input.txt').toString().split('\n')

const firstReg = /^[^0-9]*(?<first>[0-9])/
const lastReg = /(?<last>[0-9])[^0-9]*$/

const result = lines.reduce((acc, curr) => {
    const firstMatches = firstReg.exec(curr)
    const lastMatches = lastReg.exec(curr)
    return acc + Number(`${firstMatches.groups.first}${lastMatches.groups.last}`)
}, 0)

console.log('Answer is: ' + result)