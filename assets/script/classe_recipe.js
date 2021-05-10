/**
 * Créé une nouvelle classe contenant les recettes, ainsi que les methodes liées permetant le tri, ou l'affichage
 * @class
 */
class Recettes {
  constructor(obj) {
    this.recettes_listes = obj;
  }
  /**
   * Affecter une liste de recette a notre classe. Lorsque l'on effectue des recherches, on utilise cette méthode pour actualiser la liste, et ainsi, ne pas travailler sur la liste orginale.
   * @param {object} obj 
   */
  reset_liste(obj){
   // this.recettes_listes = this.original_liste;
   this.recettes_listes = obj;
  }
  /**
   * Faire la liste des ingrédients contenu dans chaque recette
   * @returns {array}
   */
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
/**
 * Faire la liste des outils contenu dans chaque recette
 * @returns {array}
 */
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
/**
 * Faire la liste des appareils contenu dans chaque recette
 * @returns {array}
 */
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
/**
 * Normalise un string => Supprime les caractère spéciaux, accents, parenthèse, etc, et mets tous les caractère en minuscule afin de faciliter la recherche
 * @param {string} str 
 * @returns {string}
 */
  normalizeStr(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[()]/g, "")
      .toLowerCase();
  }
/**
 * Afficher la liste des items correspondant au type dans la liste correspondantes. Par exemple : liste les ingrédients dans la liste ingrédient, et défini le paramètre data-disable si l'ingredient afficher est déja placer dans les tags
 * @param {HTMLElement} node 
 * @param {string} type 
 * @param {string} listOfTag 
 */
  display(node, type, listOfTag){
    let list = (type == "ingredient") ? this.ingredient_liste : type == "outil" ? this.outils_liste : this.appareil_liste;
    node.innerHTML = "";
    
    list.sort();
    list.forEach(el => {
      let disable = false;
      if(listOfTag && listOfTag.match(el)) disable = true;
      node.innerHTML += `<p data-disable = ${disable} data-type = ${type}>${el}</p>`;
    })

  }

/**
 * Effectuer le tri des recettes selon un tag et un type de tag(ingredient, outil ou appareil)
 * Retourne un tableau contenant la liste des recettes valide
 * @param {string} keyword 
 * @param {string} type 
 * @returns {array} recipesList
 */
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
/**
 * Effectuer le tri des recettes selon les inputs que l'on saisie
 * Retourne un tableau contenant la liste des recettes valide
 * @param {string} inpuString 
 * @returns {array} el
 */
  filtrer_via_input(inpuString){
    let str = this.normalizeStr(inpuString);
    return this.recettes_listes.filter(el=>{
      return this.normalizeStr(el.name).match(str) ? el 
           : this.normalizeStr(el.description).match(str) ? el 
           : el.ingredients.some(elt => this.normalizeStr(elt.ingredient).match(str)) ? el 
           : false ;
    }) 
  }
  filtrer_via_input1(inpuString){
    let str = this.normalizeStr(inpuString);
    return this.recettes_listes.filter(el=>{
      return this.normalizeStr(el.name).match(str) ? el 
           : this.normalizeStr(el.description).match(str) ? el 
           : el.ingredients.filter(elt => this.normalizeStr(elt.ingredient).match(str)).length>0 ? el 
           : false ;
    }) 
  }
  filtrer_via_input2(inpuString){
    let str = this.normalizeStr(inpuString);
    return this.recettes_listes.filter(el=>{
      return this.normalizeStr(el.description).match(str) ? el 
           : this.normalizeStr(el.name).match(str) ? el 
           : el.ingredients.filter(elt => this.normalizeStr(elt.ingredient).match(str)).length>0 ? el 
           : false ;
    }) 
  }
  filtrer_via_input3(inpuString){
    let str = this.normalizeStr(inpuString);
    return this.recettes_listes.filter(el=>{
      return  el.ingredients.filter(elt => this.normalizeStr(elt.ingredient).match(str)).length>0 ? el 
           : this.normalizeStr(el.description).match(str) ? el 
           :  this.normalizeStr(el.name).match(str)? el 
           : false ;
    }) 
  }
  filtrer_via_input4(inpuString){
    let str = this.normalizeStr(inpuString);
    return this.recettes_listes.filter(el=>{
      return  this.normalizeStr(el.description).match(str) ? el 
           : el.ingredients.filter(elt => this.normalizeStr(elt.ingredient).match(str)).length>0 ? el 
           :  this.normalizeStr(el.name).match(str)? el 
           : false ;
    }) 
  }
}
