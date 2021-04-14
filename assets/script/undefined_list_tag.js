class search_item_liste{
  constructor(liste_recette){
    this.liste = [];
    this.initialise_liste(liste_recette);
  }
  initialise_liste(liste_recette){
    liste_recette.forEach(element => {
      /**
       * Attention. On fait la liste des ingrédients, seulement, certains sont au pluriel, d'autres au singulier, et des fois même certain sont en double, mais avec des variation d'accent. On essaie donc d'uniformiser la liste.
       * Si des aliments sont disponibles au singulier, on les mets dans la liste, et ensuite, on vérifie une 2e fois, pour placer ceux qui sont uniquement au pluriel.
       * Voici donc la raison qui nous poussent à faire deux fois la boucle.
      */
      element.ingredients.forEach(elt =>{
        let str = elt.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if(!str.match(/s$/g)){
          if(this.liste.indexOf(str) == -1 ) this.liste.push(str)
        }
      })
      element.ingredients.forEach(elt =>{
        let str = elt.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        let str_sans_s = str.replace(/s$/g, "");
        if(str.match(/s$/g)){
          if(this.liste.indexOf(str) == -1 && this.liste.indexOf(str_sans_s) == -1 ) this.liste.push(str)
        }
      })
    });
  }

  sort(){
    this.liste.sort((a , b)=>{
      return a > b ? 1 : -1;
    })
    return this
  }
  display(node){
    this.liste.forEach(elm =>{
      node.innerHTML += `<p>${elm}</p>`;
    /*   let pDiv = d.createElement("p");
      pDiv.textContent = elm;
      ingredient_balise.appendChild(pDiv) */
    })
  }
}
