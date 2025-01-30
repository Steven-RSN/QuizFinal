
const vignette= document.getElementsByClassName('theme')
const vignetteTableau = Array.from(vignette)
const listeD = document.getElementById('categorie')
console.log(listeD)


const apiFetch = async(url, body)=> { 
    try{
        const rawData = await fetch(url, body);
    
        if (!rawData.ok || rawData.status !== 200) {
            console.error("Erreur lors de la récupération des données : ", rawData.statusText);
            return;
        }

        const transformedData = await rawData.json();
        return(transformedData);
    }
    catch (error) {
        console.error("Erreur lors de l'appel à l'API : ", error);
    }
}

let arrayQuizz = await apiFetch("https://quizz.adrardev.fr/api/quizzs/all", {method:"GET"});
console.log(arrayQuizz)


for(let i=0; i<arrayQuizz.length;i++ ){
    // console.log(vignetteTableau[i])
    const titre = vignetteTableau[i].querySelector('h3')
    titre.textContent=`${arrayQuizz[i].title}`   
    
} 

for(let i=0; i<arrayQuizz.length;i++){

   for(let i =0; i<arrayQuizz[i].categories.length;i++){
    console.log(arrayQuizz[i].categories[i].title)
    const option= document.createElement('option')
    option.textContent=`${arrayQuizz[i].categories[i].title}`
    listeD.appendChild(option)
   }

}

