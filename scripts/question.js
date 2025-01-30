const titre = document.querySelector('.titre')
console.log(titre)
const question = document.querySelector('.question')
console.log(question)

const lis = document.querySelectorAll('.reponse')
const liTableau = Array.from(lis)

console.log(liTableau)

for(let i=0 ; i<liTableau.length;i++){
    console.log(liTableau[i].textContent)
    // liTableau[i].textContent=`bonjour${i}`
}
