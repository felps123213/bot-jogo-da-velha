const game = {
    start: true,
    currentMove: 'X',
    bot: {
        active: false
    },
    players: {
        score1: 0,
        score2: 0
    }
}

function getField(fieldNumber) {
    const $field = document.querySelector('.battle-field-' + fieldNumber)

    return $field
}

const $field = getField(0)

function toggleCurrentMove() {
    if (game.currentMove === 'X') {
        game.currentMove = 'O'
    } else if (game.currentMove === 'O') {
        game.currentMove = 'X'
    }
}


function veryfyFields(firstField, secondField, thirdField) {
    const $fieldList = document.querySelectorAll('.senary-field-big')
    const hasWinner = $fieldList[firstField].textContent !== ''
        && $fieldList[firstField].textContent === $fieldList[secondField].textContent
        && $fieldList[secondField].textContent === $fieldList[thirdField].textContent

    return hasWinner
}

function getWinner() {
    if (veryfyFields(0, 1, 2)) {
        return game.currentMove
    } else if (veryfyFields(3, 4, 5)) {
        return game.currentMove
    } else if (veryfyFields(6, 7, 8)) {
        return game.currentMove
    } else if (veryfyFields(0, 3, 6)) {
        return game.currentMove
    } else if (veryfyFields(1, 4, 7)) {
        return game.currentMove
    } else if (veryfyFields(2, 5, 8)) {
        return game.currentMove
    } else if (veryfyFields(0, 4, 8)) {
        return game.currentMove
    } else if (veryfyFields(2, 4, 6)) {
        return game.currentMove
    }

    return ''
}

function addPlayerScore(winner) {
    if (winner === 'X') {
        game.players.score1 += 1
    } else if (winner === 'O') {
        game.players.score2 += 1
    }

}

function printPlayerScore() {
    const [$score1, $score2] = document.querySelectorAll('.number')

    $score1.textContent = game.players.score1
    $score2.textContent = game.players.score2
}

function resetBoard() {
    const $fieldList = document.querySelectorAll('.senary-field-big')

    for (const $field of $fieldList) {

        $field.textContent = ''
    }

}

function getPlayerName(move) {
    if (move === 'X') {
        const $player1 = document.querySelector('.player1')
        return $player1.textContent
    } else if (move === 'O') {
        const $player2 = document.querySelector('.player2')
        return $player2.textContent
    }
}

function printWinnerName(winnerName) {
    const $winnerField = document.querySelector('.winner-name')
    $winnerField.textContent = winnerName
}

function configSwitcher(query, callback) {
    const $switcher = document.querySelector(query)

    $switcher.addEventListener('click', function () {
        $switcher.classList.toggle('switcher-active')
        callback()
    })
}

function botMove() {
    const botOn = document.querySelector('.switcher-active')

    if(!botOn){return}

    const move = randomNumber(8)

    const $field = getField(move)

    const canNotPlay = draw()

    if(canNotPlay) {return}

    if ($field.textContent !== ''){
        return botMove()
    }

    play($field)
}

function draw() {
    const $fieldList = document.querySelectorAll('.senary-field-big')
    let filledFields = 0

    for (const $field of $fieldList){
        if ($field.textContent){filledFields ++}
    }

    const winner = getWinner()

    if(filledFields === 9 && !winner){
        return true
    }

    return false
}

function randomNumber(max) {
    const number = Math.floor(Math.random() * max + 1)

    return number
}

function play($field) {
    if ($field.textContent !== '' || game.start === false) return
    $field.textContent = game.currentMove

    const winner = getWinner()

    if (winner !== '') {
        addPlayerScore(winner)

        printPlayerScore()

        setTimeout(resetBoard, 1000)

        game.start = false

        const winnerName = getPlayerName(winner)

        printWinnerName(winnerName)

        setTimeout(function () {
            game.start = true
        }, 1000)
    }

    const hasDraw = draw()

    if (hasDraw){
        setTimeout(resetBoard, 1000)
    }

    toggleCurrentMove()
}

for (let i = 0; i < 9; i++) {
    const $field = getField(i)

    console, console.log($field)

    $field.addEventListener('click', function () {
        play($field)
        botMove()
        draw()
    })
}

configSwitcher('.switcher-bot', function () {
    game.bot.active = !game.bot.active
})
