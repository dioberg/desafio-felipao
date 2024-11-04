

const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        live: document.querySelector("#live")
    },

    values: {
        gameTime: 600,
        hitPosition: 0,
        result: 0,
        curretTime: 30,
        lives: 3,
    },

    actions: {
        timeId: setInterval(randomSquare, 600),
        countDownTimeId:setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.curretTime--
    state.view.timeLeft.textContent = state.values.curretTime

    if(state.values.curretTime <= 0) { 
        

        clearInterval(state.actions.countDownTimeId)
        clearInterval(state.actions.timeId)

       alert(`Seu tempo acabou! Você conseguiu ${state.values.result} pontos.`)
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()

}

function randomSquare() {
    //remove o inimigo de todas as caixas
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })
    //escolhe uma caixa aleatoria para colocar inimigo
    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id

}





function addListenerHitBox() {
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound('hit')
            }else {
                loseLife() //chama a função para peder a vida
            }
        })
    })
}

function loseLife() {
    state.values.lives-- // decrementa as vidas
    state.view.live.textContent = state.values.lives // atualiza a exibição das vidas

    if(state.values.lives <= 0) {
        clearInterval(state.actions.countDownTimeId)
        clearInterval(state.actions.timeId)
        alert("GAME OVER! você perdeu")
    }
}


function initialize() {
    state.view.live.textContent = state.values.lives //inicializa a exibição das vidas
    
   
    addListenerHitBox()
}


initialize()