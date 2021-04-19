class Recettes {
  constructor(obj) {
    this.recettes_listes = obj;
  }
  reset_liste(obj){
   // this.recettes_listes = this.original_liste;
   this.recettes_listes = obj;
  }
  make_ingredient_liste() {
    this.ingredient_liste = [];
    this.recettes_listes.forEach((element) => {
      /**
       * Attention. On fait la liste des ingrédients, seulement, certains sont au pluriel, d'autres au singulier, et des fois même certain sont en double, mais avec des variation d'accent. On essaie donc d'uniformiser la liste.
       * Si des aliments sont disponibles au singulier, on les mets dans la liste, et ensuite, on vérifie une 2e fois, pour placer ceux qui sont uniquement au pluriel.
       * Voici donc la raison qui nous poussent à faire deux fois la boucle.
       */
      element.ingredients.forEach((elt) => {
        let str = this.normalizeStr(elt.ingredient);
        if (!str.match(/s$/g)) {
          if (this.ingredient_liste.indexOf(str) == -1) this.ingredient_liste.push(str);
        }
      });
      element.ingredients.forEach((elt) => {
        let str = elt.ingredient
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        let str_sans_s = str.replace(/s$/g, "");
        if (str.match(/s$/g)) {
          if (
            this.ingredient_liste.indexOf(str) == -1 &&
            this.ingredient_liste.indexOf(str_sans_s) == -1
          )
            this.ingredient_liste.push(str);
        }
      });
    });
    return this.ingredient_liste;
  }

  make_outils_liste() {
    this.outils_liste = [];
    this.recettes_listes.forEach((el) => {
      el.ustensils.forEach((elt) => {
        let str = this.normalizeStr(elt);
        if (this.outils_liste.indexOf(str) == -1) this.outils_liste.push(str);
      });
    });
    return this.outils_liste;
  }

  make_appareil_liste() {
    this.appareil_liste = [];
    this.recettes_listes.forEach((el) => {
      let str = this.normalizeStr(el.appliance);
      if (this.appareil_liste.indexOf(str) == -1) this.appareil_liste.push(str);
    });
    return this.appareil_liste;
  }

  get get_ingredient_liste(){
    return this.ingredient_liste;
  }

  get get_outils_liste(){
    return this.outils_liste;
  }

  get get_appareil_liste(){
    return this.appareil_liste;
  }

  normalizeStr(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[()]/g, "")
      .toLowerCase();
  }

  display(node, type){
    let list = (type == "ingredient") ? this.ingredient_liste : type == "outil" ? this.outils_liste : this.appareil_liste;
    node.innerHTML = "";
    list.sort();
    list.forEach(el => {
      node.innerHTML += `<p data-type = ${type}>${el}</p>`;
    })

  }
  display_when_tag_input(node, type, liste){
    
    node.innerHTML = "";
    liste.forEach(el => {
      node.innerHTML += `<p data-type = ${type}>${el}</p>`;
    })

  }

  make_simplified_str_from_array(arr){
    let simple = []
    console.log(arr)
    arr.forEach(el=>{
      simple.push(el.id)
    })
  return simple.join("|");
  }

  revert_simplified_str_from_array(str){
    let simple = [];
    simple = str.split("|");
    simple = simple.map(el => +el)
    console.log(simple)
    return this.recettes_listes.filter(el => simple.indexOf(el.id)!== -1 )
  }



  filtrer(keyword, type){
    let arr = [];
     let criteria = {
      ingredient : () => ingredientTri(this.recettes_listes),
      outil : () => outilTri(this.recettes_listes),
      appareil : () => appareilTri(this.recettes_listes),
      all : () => allTri(this.recettes_listes)
    }

    criteria[type]()

      function ingredientTri(box){
        box.forEach(el => {
          el.ingredients.forEach(elt =>{
            let str = normaliser(elt.ingredient)
            if(str.match(keyword)) arr.push(el)
          })
        })
      }

      function outilTri(box){
        box.forEach(el =>{
          el.ustensils.forEach(elt =>{
          let str = normaliser(elt)
          if(str.match(keyword)) arr.push(el)
          })
        })
      }

      function appareilTri(box){
        box.forEach(el =>{
          let str = normaliser(el.appliance)
          if(str.match(keyword)) arr.push(el)
        })
      }

      function allTri(box){
        box.forEach(el =>{
          let str = normaliser(el.appliance)
          if(str.match(keyword)){
            arr.push(el);
            return;
          }
          else {
            el.ustensils.forEach(elt => {
              str = normaliser(elt)
              if(str.match(keyword)){
                arr.push(el);
                return;
              }
            })
            el.ingredients.forEach(elt =>{
              str = normaliser(elt.ingredient)
              if(str.match(keyword)){
                arr.push(el);
                return;
              }
            })
          }
        })
      }
    return arr;
    }

  filtrer_via_input(inpuString){
    let str = this.normalizeStr(inpuString);
    //console.log(this.recettes_listes)
    return this.recettes_listes.filter(el=>{
      let string = this.normalizeStr(el.name)
      if(string.match(str)) return el
      string = this.normalizeStr(el.description)
      if(string.match(str)) return el
      el.ingredients.forEach(elt =>{
        string = this.normalizeStr(elt.ingredient)
        if(string.match(str)) return el
      })
    })
  }
}






/* function listenerInputSearchBar(ev){
  let arr = recettes.filtrer_via_input(ev.target.value);
  upgrade_affichage_liste_recette_custom(arr)
  upgrade_liste_item_tag()
} */


//let inputIng = document.querySelector(".formulaire_input_container_ingredient")

//inputIng.addEventListener("input", changeIntoTagSearch )


function changeIntoTagSearch(){
  console.log(recettes.get_ingredient_liste)
  display_when_tag_input(ingredient_balise, "ingredient", arr)

}
