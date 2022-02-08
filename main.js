// Ceci est la correction de l'examen

import {oSettings} from "./settings";

const eUl = document.querySelector(".app");
const eFonts = document.querySelector("#fonts");
const eInformation_score = document.querySelector(".information__score");
const eInformation_time = document.querySelector(".information__time");
const eFormPlay = document.querySelector("#play");
const eWrongCards = document.querySelector(".wrong-cards");
const eFormPlayName = eFormPlay.querySelector("#font");
const eFormPlayFamily = eFormPlay.querySelector("#family");
let fScore = 0;
const iMaxScore = window.fonts.length;
const sTextScore = eInformation_score.dataset.text;
const sTextTime = eInformation_time.dataset.text;
let iTimeLeft = oSettings.iMaxTime;
let iIntervalId = setInterval(()=>{
    if (iTimeLeft === 0){

    }
    iTimeLeft--;
},1000)

function displayScore(){
    eInformation_score.innerHTML = `${sTextScore}  <span>${fScore}/${iMaxScore}</span>`
}
function displayTime(){
    const iMinutes = Math.floor(iTimeLeft/60);
    const iSeconds = Math.floor(iTimeLeft%60);
    eInformation_time.innerHTML = `${sTextTime}  <time datetime="${iMinutes}:${iSeconds}">${iMinutes}:${iSeconds}</time>`
}
function fZero(nb){
    if (nb<10){
        return "0"+nb
    }else {
        return nb
    }
}

for (const font of window.fonts){
    eUl.insertAdjacentHTML("beforeend", `<li data-font-name="${font.name}" data-family="${font.family}" class='app__item'><div class="app__item__info"><span class="app__item__info__name">${font.name}</span><span class="app__item__info__info">${font.family} - ${font.author}</span></div><img class='app__item__font' src='./assets/fonts/${font.file}.svg' alt='Aa, abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ'></li>`);
    eFonts.insertAdjacentHTML('beforeend',`<option value="${font.name}"`)
}



displayScore();
displayTime();


function fRemoveCard(event){
    eWrongCards.insertAdjacentElement('afterbegin',eCurrentCard.cloneNode(true));
    eCurrentCard.classList.add("app__item--move", "app__item--move--error");
}
function fWrong(){}
function fAfterPlay(){
    eFormPlayName.value="";
    eFormPlayFamily.value="";
    eFormPlayName.focus();
    displayScore()
}
function fPlay(event){
    event.preventDefault();
    let eCurrentCard = eUl.querySelector('.app__item:last-child');
    console.log(eCurrentCard.dataset.fontName,eCurrentCard.dataset.family);
    console.log(eFormPlayName.value,eFormPlayFamily.value);
    eCurrentCard.addEventListener('transitionend',(event)=>{
        event.currentTarget.remove();
    })
    if (eCurrentCard.dataset.fontName === eFormPlayName.value && eCurrentCard.dataset.family === eFormPlayFamily.value){
        fScore++;
        eCurrentCard.classList.add("app__item--move", "app__item--move--success")
    }else if (eCurrentCard.dataset.fontName === eFormPlayName.value || eCurrentCard.dataset.family === eFormPlayFamily.value){
        fRemoveCard(eCurrentCard);
        fScore = fScore + 0.5;
    }else {
        fRemoveCard(eCurrentCard);
    }

    fAfterPlay();
}

eFormPlay.addEventListener('submit',(event)=>{
    fPlay(event);
})