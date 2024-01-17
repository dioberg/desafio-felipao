
function matches(victory, defeat) {
    let result = victory - defeat
    return result
}

function rank() {
    let resultRank = matches(150, 35)
    let level = " "

    if (resultRank <= 10){
        level = "Ferro"
    }else if(resultRank >= 11 && resultRank <=20){
      level = "Bronze"
    }else if(resultRank >= 21 && resultRank <=50){
      level = "Prata"
    }else if(resultRank >= 51 && resultRank <=80){
      level = "Ouro"
    }else if(resultRank >= 81 && resultRank <=90){
      level = "Diamante"
    }else if(resultRank >= 91 && resultRank <=100){
      level = "Lendário"
    }else if(resultRank >=101){
      level = "Imortal"
    }

    return`O heroi tem de Saldo de ${resultRank} e está de Nivel ${level}`
}

console.log(rank())