

const state = {
    score: {
        playerScore: 0,
        computerScore:0,
        scoreBox: document.getElementById('score_points')
    },

    cardSprintes: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },

    playerSides : {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards"),
        
    },

    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card")
    },

    action: {
        button: document.getElementById("next-duel"),
    },
    
}




const pathImages = "./src/assets/icons/"

const cardData = [
    {
        id: 0,
        name: "Dragão branco de olhos azuis",
        type: "papel",
        img: `${pathImages}dragon.png`,
        ganha: [1],
        perde: [2]

    },
    {
        id: 1,
        name: "Dark Magician",
        type: "pedra",
        img: `${pathImages}magician.png`,
        ganha: [2],
        perde: [0]

    },
    {
        id: 2,
        name: "Exodia",
        type: "tessoura",
        img: `${pathImages}exodia.png`,
        ganha: [0],
        perde: [1]

    }

]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png")
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");


    if(fieldSide === state.playerSides.player1){
        cardImage.addEventListener("mouseover", () => {
        drawSelectCard(IdCard);

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"))
        })
    });
    }

    return cardImage
}


async function setCardsField(cardId) {

    //remover todas as cartas antes
    await removeAllCardsImage();



    let computerCardId = await getRandomCardId();
    
    await showHiddenCardFieldsImage(true)
    await hiddenCardDetails();

    await drawCardsInfield(cardId, computerCardId)


    let duelResults = await checkDuelResults(cardId, computerCardId)
    await updateScore();
    await drawButton(duelResults);

}

async function drawCardsInfield(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}


async function showHiddenCardFieldsImage(value) {
    if(value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }
    
    if(value === false){
        state.fieldCards.player.style.display = "none"
        state.fieldCards.computer.style.display = "none"
    }
}

async function hiddenCardDetails() {
    state.cardSprintes.avatar.src = "";
    state.cardSprintes.name.innerHTML = "";
    state.cardSprintes.type.innerHTML = "";    
} 
    


async function drawButton(text) {
    state.action.button.innerText = text.toUpperCase();
    state.action.button.style.display = "block"
}

async function updateScore() {
    state.score.scoreBox.innerText = `Vitórias: ${state.score.playerScore} | Derrotas: ${state.score.computerScore}`
}


async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];

    if(playerCard.ganha.includes(computerCardId)) {
        duelResults ="Ganhou";
        await playAudio("win")
        state.score.playerScore++;

    }


    if(playerCard.perde.includes(computerCardId)) {
        duelResults = "Perdeu";
        await playAudio("lose")
        state.score.computerScore++;
    }

    return duelResults;

}

async function removeAllCardsImage() {
    let {computerBox, player1Box} = state.playerSides;
    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    
    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}


async function drawSelectCard(index) {
    state.cardSprintes.avatar.src = cardData[index].img;
    state.cardSprintes.name.innerText = cardData[index].name;
    state.cardSprintes.type.innerText = "Atribudo : " + cardData[index].type; 

}


async function drawCards(cardNumber, fieldSide) {
    for(let i = 0; i < cardNumber; i++){
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage);
        
    }
}

async function resetDuel() {
    state.cardSprintes.avatar.src = "";
    state.action.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    audio.play();
}




function init() {
    showHiddenCardFieldsImage(false)

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    const bgm = document.getElementById("bgm")
    bgm.play();
}

init()