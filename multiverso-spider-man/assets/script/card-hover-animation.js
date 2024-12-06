

function handleMouseEnter(){
    this.classList.add('spider-card--hovered');
    document.body.id = `${this.id}-hovered`;
}

function handleMouseLeave(){
    this.classList.remove('spider-card--hovered');
    document.body.id = '';
}

function addEventlistenersToCards() {
    const cardElements = document.getElementsByClassName('spider-card')
    
    for(let index = 0; index < cardElements.length; index++){
        const card = cardElements[index];
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
    }
}

document.addEventListener("DOMContentLoaded", addEventlistenersToCards, false)