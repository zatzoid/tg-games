module.exports.StonePapper = (playersArr) => {
    if (playersArr.some(el => el.value === '')) return null
    else {
        const gameRule = {
            stone: {
                stone: 0,
                papper: -1,
                scissors: 1
            },
            papper: {
                stone: 1,
                papper: 0,
                scissors: -1
            },
            scissors: {
                stone: -1,
                papper: 1,
                scissors: 0
            }
        }

        if (gameRule[playersArr[0].value][playersArr[1].value] === 0) {
            return 'ничья'
        } else if (gameRule[playersArr[0].value][playersArr[1].value] > 0) {
            return `winner is ${playersArr[0].name}`
        } else if (gameRule[playersArr[0].value][playersArr[1].value] < 0) {
            return `winner is ${playersArr[1].name}`
        }

    }

}