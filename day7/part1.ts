const input = await Bun.file('input.txt').text()
const lines = input.split('\n').filter(text => text !== '')
const rounds = lines.map(line => {
    const [handText, betText] = line.split(' ')
    return {
        hand: handText.split('') as Hand,
        bet: Number(betText)
    }
})

const Cards = {
    A: 0,
    K: 1,
    Q: 2,
    J: 3,
    T: 4,
    9: 5,
    8: 6,
    7: 7,
    6: 8,
    5: 9,
    4: 10,
    3: 11,
    2: 12,
}

type CardType = keyof typeof Cards
type Hand = CardType[]
type HandCount = Partial<typeof Cards>

function parseHand(hand: Hand): HandCount {
    const parsedHand: HandCount = {}
    hand.forEach(card => {
        if(parsedHand[card] !== undefined) parsedHand[card]! += 1
        else parsedHand[card] = 1
    })
    return parsedHand
}

const HandTypes = {
    Five: 0,
    Four: 1,
    FullHouse: 2,
    Three: 3,
    Two: 4,
    Pair: 5,
    High: 6
} as const

type HandValue = typeof HandTypes[keyof typeof HandTypes]

function evalHand(hand: HandCount): HandValue {
    if (Object.values(hand).some(cardFrequency => cardFrequency === 5)) return HandTypes.Five
    if (Object.values(hand).some(cardFrequency => cardFrequency === 4)) return HandTypes.Four
    if (Object.values(hand).some(cardFrequency => cardFrequency === 3) && Object.values(hand).some(cardFrequency => cardFrequency === 2)) return HandTypes.FullHouse
    if (Object.values(hand).some(cardFrequency => cardFrequency === 3)) return HandTypes.Three
    if (Object.values(hand).some(cardFrequency => cardFrequency === 2)) return HandTypes.Two
    return HandTypes.High
}

function evalIsStronger(strongerHand: Hand, weakerHand: Hand): number {
    const hand1 = parseHand(strongerHand)
    const hand2 = parseHand(weakerHand)
    const hand1Result = evalHand(hand1)
    const hand2Result = evalHand(hand2)
    if (hand1Result === hand2Result) {
        if (hand1Result === HandTypes.High) {
            const highCard1 = [...strongerHand].sort((card1, card2) => Cards[card1] < Cards[card2] ? -1 : 1)[0]
            const highCard2 = [...weakerHand].sort((card1, card2) => Cards[card1] < Cards[card2] ? -1 : 1)[0]
            if (highCard1 !== highCard2) {
                return Cards[highCard1] < Cards[highCard2] ? -1 : 1
            }
        }
        if (strongerHand.every((card, i) => card === weakerHand[i])) return 0
        return strongerHand.reduce((acc, curr, i) => {
            if(acc !== null) return acc
            else if (Cards[curr] === Cards[weakerHand[i]]) return null
            else if (Cards[curr] < Cards[weakerHand[i]]) return true
            else return false
        }, null as null | boolean) ? 1 : -1
    }
    return hand1Result < hand2Result ? 1 : -1
}

const sortedHands = rounds.sort((round1, round2) => evalIsStronger(round1.hand, round2.hand))
// console.log(sortedHands)

const winnings = sortedHands.reduce((acc, curr, i) => acc + curr.bet * (i + 1), 0)

console.log('Winnings are: ' + winnings)